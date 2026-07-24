import { readFile } from 'node:fs/promises'
import { findMatchingCombinations } from '../src/features/subjectLookup/combinations.js'
import {
  buildVerifiedCombinationCatalog,
  getAdmissionsForCombination,
} from '../src/features/subjectLookup/admissions.js'

const readJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, import.meta.url), 'utf8'))

const groups = await readJson('../src/data/to_hop_lop10_truong.json')
const admissions = await readJson('../src/data/admissions_verified.json')
const catalog = buildVerifiedCombinationCatalog(admissions)

const report = groups.map((group) => {
  const combinations = findMatchingCombinations(group, catalog)
  const enriched = combinations.map((combo) => ({
    combo,
    admissions: getAdmissionsForCombination(combo, admissions),
  }))

  return {
    th: group.ma,
    combinations: combinations.length,
    combinations_with_verified_data: enriched.filter(
      (item) => item.admissions.schools.length > 0,
    ).length,
    verified_schools: new Set(
      enriched.flatMap((item) => item.admissions.schools.map((school) => school.name)),
    ).size,
    featured_major_records: new Set(
      enriched.flatMap((item) =>
        item.admissions.featuredMajors.map((major) => `${major.code}:${major.school}`),
      ),
    ).size,
  }
})

const uniqueCombinations = new Map()
groups.forEach((group) => {
  findMatchingCombinations(group, catalog).forEach((combo) => {
    uniqueCombinations.set(combo.id, combo)
  })
})

const missing = [...uniqueCombinations.values()]
  .filter((combo) => getAdmissionsForCombination(combo, admissions).schools.length === 0)
  .map((combo) => ({ id: combo.id, code: combo.ma, subjects: combo.mon }))

process.stdout.write(`${JSON.stringify({
  by_group: report,
  unique_combinations: uniqueCombinations.size,
  missing_count: missing.length,
  missing,
}, null, 2)}\n`)
