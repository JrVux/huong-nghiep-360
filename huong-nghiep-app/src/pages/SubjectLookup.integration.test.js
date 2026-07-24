import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('SubjectLookup dùng combination engine và admissions repository', async () => {
  const source = await readFile(new URL('./SubjectLookup.jsx', import.meta.url), 'utf8')

  assert.match(source, /findMatchingCombinations/)
  assert.match(source, /getAdmissionsForCombination/)
  assert.match(source, /admissions_verified\.json/)
})
