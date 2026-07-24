import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('chỉ giữ Bảng 2 trong khu vực dữ liệu tham khảo', async () => {
  const source = await readFile(
    new URL('./SubjectLookup.jsx', import.meta.url),
    'utf8',
  )

  assert.doesNotMatch(source, /Bảng 1: 36 cặp môn/)
  assert.doesNotMatch(source, /Bảng 3: Tổ hợp có môn Tin học/)
  assert.doesNotMatch(source, /toHop36|toHopTin/)
  assert.match(source, /Bảng 2: Điểm chuẩn PTIT 2021-2025/)
})
