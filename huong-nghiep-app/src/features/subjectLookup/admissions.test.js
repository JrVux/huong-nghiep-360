import test from 'node:test'
import assert from 'node:assert/strict'
import { getAdmissionsForCombination } from './admissions.js'

const combo = {
  ma: 'A00',
  mon: ['Toán', 'Vật Lí', 'Hóa học'],
}

test('lọc ngành theo đúng ba môn và giới hạn trường ngành', () => {
  const schools = Array.from({ length: 6 }, (_, index) => ({
    name: `Trường ${index}`,
    location: index === 0 ? 'TP.HCM' : index === 1 ? 'Cần Thơ' : 'Đồng Nai',
    source_year: index === 5 ? 2025 : 2026,
    source_url: `https://example${index}.edu.vn`,
    source_title: 'Nguồn',
    checked_at: '2026-07-24',
    majors: Array.from({ length: 3 }, (__, majorIndex) => ({
      code: `${index}${majorIndex}`,
      name: `Ngành ${index}-${majorIndex}`,
      subject_sets: [['Toán', 'Vật Lí', 'Hóa học']],
      trend_tags: ['Xu hướng'],
    })),
  }))

  const result = getAdmissionsForCombination(combo, { schools })

  assert.equal(result.schools.length, 5)
  assert.equal(result.featuredMajors.length, 10)
  assert.equal(result.schools[0].location, 'TP.HCM')
  assert.equal(result.schools[1].location, 'Cần Thơ')
  assert.equal(
    result.featuredMajors.every((major) =>
      result.schools.some((school) => school.name === major.school)),
    true,
  )
})

test('mã X chỉ khớp khi đúng bộ ba môn của trường', () => {
  const data = {
    schools: [{
      name: 'Trường X',
      location: 'TP.HCM',
      source_year: 2026,
      source_url: 'https://example.edu.vn',
      source_title: 'Nguồn',
      checked_at: '2026-07-24',
      combination_definitions: {
        X57: ['Toán', 'Tin học', 'Công nghệ nông nghiệp'],
      },
      majors: [{
        code: '1',
        name: 'Ngành X',
        combination_codes: ['X57'],
      }],
    }],
  }

  assert.equal(
    getAdmissionsForCombination(
      { ma: 'X57', mon: ['Toán', 'GDKT&PL', 'Tin học'] },
      data,
    ).schools.length,
    0,
  )
  assert.equal(
    getAdmissionsForCombination(
      { ma: 'X57', mon: ['Toán', 'Tin học', 'Công nghệ nông nghiệp'] },
      data,
    ).schools.length,
    1,
  )
})
