import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { buildCombinationCatalog, findMatchingCombinations } from './combinations.js'
import { buildStudentSubjectSet } from './subjects.js'

const catalog = [
  { ma: 'A00', mon: ['Toán', 'Vật Lí', 'Hóa học'] },
  { ma: 'A01', mon: ['Toán', 'Vật Lí', 'Tiếng Anh'] },
  { ma: 'B00', mon: ['Toán', 'Hóa học', 'Sinh học'] },
  { ma: 'C00', mon: ['Ngữ văn', 'Lịch sử', 'Địa lí'] },
]

test('TH1 nhận A00 A01 B00 nhưng không nhận C00', () => {
  const group = {
    mon: ['Vật Lí', 'Hóa học', 'Sinh học', 'Công nghệ nông nghiệp'],
  }

  assert.deepEqual(
    findMatchingCombinations(group, catalog).map((item) => item.ma),
    ['A00', 'A01', 'B00'],
  )
})

test('không nhận bản ghi không có đúng ba môn', () => {
  const group = { mon: ['Vật Lí', 'Hóa học', 'Sinh học', 'Tin học'] }
  const invalid = [{ ma: 'BAD', mon: ['Toán', 'Vật Lí'] }]

  assert.deepEqual(findMatchingCombinations(group, invalid), [])
})

test('giữ riêng hai biến thể cùng mã X khi bộ ba môn khác nhau', () => {
  const variants = buildCombinationCatalog([
    { ma: 'X57', mon: ['Toán', 'GDKT&PL', 'Tin học'] },
    { ma: 'X57', mon: ['Toán', 'Tin học', 'Công nghệ nông nghiệp'] },
  ])

  assert.equal(variants.length, 2)
  assert.notEqual(variants[0].id, variants[1].id)
})

test('mọi kết quả thật của TH1 đến TH4 đều gồm ba môn thuộc tập tám môn', async () => {
  const dataUrl = new URL('../../data/', import.meta.url)
  const groups = JSON.parse(await readFile(new URL('to_hop_lop10_truong.json', dataUrl), 'utf8'))
  const manual = JSON.parse(await readFile(new URL('to_hop_a_b_c_chi_tiet.json', dataUrl), 'utf8')).data
  const informatics = JSON.parse(await readFile(new URL('to_hop_tin.json', dataUrl), 'utf8')).data

  for (const group of groups) {
    const subjects = buildStudentSubjectSet(group)
    const matches = findMatchingCombinations(group, [...manual, ...informatics])

    assert.equal(matches.length > 0, true, `${group.ma} phải có kết quả`)
    for (const combo of matches) {
      assert.equal(combo.normalized.length, 3, `${combo.ma} phải có đúng ba môn`)
      assert.equal(
        combo.normalized.every((subject) => subjects.has(subject)),
        true,
        `${combo.ma} phải thuộc tám môn của ${group.ma}`,
      )
    }
  }
})
