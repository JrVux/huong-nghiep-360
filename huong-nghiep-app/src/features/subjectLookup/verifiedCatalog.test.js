import test from 'node:test'
import assert from 'node:assert/strict'
import {
  buildVerifiedCombinationCatalog,
  getAdmissionsForCombination,
} from './admissions.js'

test('builds the catalog only from subject triples published by schools', () => {
  const data = {
    schools: [
      {
        name: 'School A',
        combination_definitions: {
          A00: ['Toán', 'Vật Lí', 'Hóa học'],
          X01: ['Toán', 'Vật Lí', 'Tin học'],
        },
        majors: [{
          code: '1',
          name: 'Major A',
          combination_codes: ['A00', 'X01'],
        }],
      },
      {
        name: 'School B',
        combination_definitions: {
          X01: ['Ngữ văn', 'Lịch sử', 'Tin học'],
        },
        majors: [{
          code: '2',
          name: 'Major B',
          subject_sets: [['Hóa học', 'Vật Lí', 'Toán']],
          combination_codes: ['X01'],
        }],
      },
    ],
  }

  const catalog = buildVerifiedCombinationCatalog(data)

  assert.equal(catalog.length, 3)
  assert.equal(
    catalog.filter((item) => item.mon.includes('Toán') && item.mon.includes('Hóa học')).length,
    1,
  )
  assert.equal(catalog.filter((item) => item.codes.includes('X01')).length, 2)
})

test('every generated combination resolves to at least one school and major', () => {
  const data = {
    schools: [{
      name: 'School A',
      location: 'TP.HCM',
      source_year: 2026,
      source_url: 'https://example.edu.vn',
      source_title: 'Official source',
      checked_at: '2026-07-24',
      combination_definitions: {
        A00: ['Toán', 'Vật Lí', 'Hóa học'],
      },
      majors: [{
        code: '1',
        name: 'Major A',
        combination_codes: ['A00'],
      }],
    }],
  }

  const catalog = buildVerifiedCombinationCatalog(data)

  assert.equal(catalog.length, 1)
  assert.equal(
    catalog.every((combo) => getAdmissionsForCombination(combo, data).schools.length > 0),
    true,
  )
})
