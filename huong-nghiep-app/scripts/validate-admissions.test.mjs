import test from 'node:test'
import assert from 'node:assert/strict'
import { validateAdmissions } from './validate-admissions.mjs'

test('báo lỗi nguồn thiếu URL và năm ngoài phạm vi', () => {
  const errors = validateAdmissions({
    updated_at: '2026-07-24',
    schools: [{
      name: 'Trường thử',
      location: 'TP.HCM',
      source_url: '',
      source_year: 2024,
      checked_at: '2026-07-24',
      majors: [{
        code: '7480201',
        name: 'Công nghệ thông tin',
        subject_sets: [['Toán', 'Vật Lí', 'Hóa học']],
      }],
    }],
  })

  assert.equal(errors.some((value) => value.includes('source_url')), true)
  assert.equal(errors.some((value) => value.includes('2024')), true)
})

test('chấp nhận trường dùng mã tổ hợp hoặc bộ ba môn trực tiếp', () => {
  const errors = validateAdmissions({
    updated_at: '2026-07-24',
    schools: [{
      name: 'Trường thử',
      location: 'Cần Thơ',
      source_url: 'https://example.edu.vn/tuyen-sinh',
      source_year: 2026,
      checked_at: '2026-07-24',
      combination_definitions: {
        A00: ['Toán', 'Vật Lí', 'Hóa học'],
      },
      majors: [
        { code: '1', name: 'Ngành 1', combination_codes: ['A00'] },
        { code: '2', name: 'Ngành 2', subject_sets: [['Toán', 'Vật Lí', 'Hóa học']] },
      ],
    }],
  })

  assert.deepEqual(errors, [])
})
