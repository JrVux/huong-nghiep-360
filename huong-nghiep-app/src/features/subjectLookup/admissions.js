import { normalizeSubject } from './subjects.js'

const subjectSignature = (subjects) =>
  (Array.isArray(subjects) ? subjects : [])
    .map(normalizeSubject)
    .sort()
    .join('|')

const locationRank = (location) => {
  if (location === 'TP.HCM') return 0
  if (location === 'Cần Thơ') return 1
  return 2
}

const getMajorMatches = (major, school, signature) => {
  const directMatch = (major.subject_sets ?? [])
    .some((subjects) => subjectSignature(subjects) === signature)
  const matchingCodes = (major.combination_codes ?? [])
    .filter((code) =>
      subjectSignature(school.combination_definitions?.[code]) === signature,
    )

  return {
    matches: directMatch || matchingCodes.length > 0,
    matchingCodes,
  }
}

export const buildVerifiedCombinationCatalog = (data) => {
  const combinations = new Map()

  ;(Array.isArray(data?.schools) ? data.schools : []).forEach((school) => {
    ;(school.majors ?? []).forEach((major) => {
      const publishedSets = [
        ...(major.subject_sets ?? []).map((subjects) => ({
          subjects,
          code: null,
        })),
        ...(major.combination_codes ?? []).map((code) => ({
          subjects: school.combination_definitions?.[code],
          code,
        })),
      ]

      publishedSets.forEach(({ subjects, code }) => {
        const signature = subjectSignature(subjects)
        if (!signature || !Array.isArray(subjects) || subjects.length !== 3) return

        const current = combinations.get(signature) ?? {
          id: signature,
          ma: code ?? '3 môn',
          mon: subjects,
          codes: [],
        }

        if (code && !current.codes.includes(code)) current.codes.push(code)
        if (current.ma === '3 môn' && code) current.ma = code
        combinations.set(signature, current)
      })
    })
  })

  return [...combinations.values()].sort((left, right) =>
    left.ma.localeCompare(right.ma, 'vi') ||
    left.id.localeCompare(right.id, 'vi'),
  )
}

export const getAdmissionsForCombination = (combo, data) => {
  const signature = subjectSignature(combo?.mon)
  if (!signature) return { schools: [], featuredMajors: [] }

  const schools = (Array.isArray(data?.schools) ? data.schools : [])
    .map((school) => {
      const majors = (school.majors ?? []).flatMap((major) => {
        const match = getMajorMatches(major, school, signature)
        return match.matches
          ? [{ ...major, matching_combination_codes: match.matchingCodes }]
          : []
      })

      return majors.length > 0 ? { ...school, majors } : null
    })
    .filter(Boolean)
    .sort((left, right) =>
      right.source_year - left.source_year ||
      locationRank(left.location) - locationRank(right.location) ||
      right.majors.length - left.majors.length ||
      left.name.localeCompare(right.name, 'vi'),
    )
    .slice(0, 5)

  const featuredMajors = schools
    .flatMap((school) =>
      school.majors.map((major) => ({
        ...major,
        school: school.name,
        location: school.location,
        source_year: school.source_year,
        source_url: school.source_url,
      })),
    )
    .sort((left, right) =>
      Number((right.trend_tags?.length ?? 0) > 0) -
        Number((left.trend_tags?.length ?? 0) > 0) ||
      left.name.localeCompare(right.name, 'vi'),
    )
    .slice(0, 10)

  return { schools, featuredMajors }
}
