import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeSubject, buildStudentSubjectSet } from './subjects.js'

test('chuẩn hóa các tên môn tương đương', () => {
  assert.equal(normalizeSubject('Văn'), 'ngu van')
  assert.equal(normalizeSubject('Sử'), 'lich su')
  assert.equal(normalizeSubject('Vật lý'), 'vat li')
  assert.equal(normalizeSubject('Lý'), 'vat li')
  assert.equal(normalizeSubject('Hóa'), 'hoa hoc')
  assert.equal(normalizeSubject('Anh'), 'tieng anh')
})

test('tạo đúng tám môn cho TH1', () => {
  const subjects = buildStudentSubjectSet({
    mon: ['Vật Lí', 'Hóa học', 'Sinh học', 'Công nghệ nông nghiệp'],
  })

  assert.equal(subjects.size, 8)
  assert.equal(subjects.has('ngu van'), true)
  assert.equal(subjects.has('lich su'), true)
})
