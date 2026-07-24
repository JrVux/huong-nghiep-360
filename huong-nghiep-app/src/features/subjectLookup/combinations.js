import { buildStudentSubjectSet, normalizeSubject } from './subjects.js'

const sortByCode = (left, right) =>
  left.ma.localeCompare(right.ma, 'vi', { numeric: true }) ||
  left.id.localeCompare(right.id, 'vi')

export const buildCombinationCatalog = (...catalogs) => {
  const byIdentity = new Map()

  catalogs.flat().forEach((combo) => {
    if (!combo?.ma || !Array.isArray(combo.mon)) return
    const normalized = combo.mon.map(normalizeSubject)
    const signature = [...normalized].sort().join('|')
    const id = `${combo.ma}:${signature}`
    byIdentity.set(id, { ...combo, id, normalized })
  })

  return [...byIdentity.values()].sort(sortByCode)
}

export const findMatchingCombinations = (group, catalog) => {
  const subjects = buildStudentSubjectSet(group)

  return buildCombinationCatalog(catalog)
    .filter((combo) =>
      combo.normalized.length === 3 &&
      combo.normalized.every((subject) => subjects.has(subject)),
    )
}
