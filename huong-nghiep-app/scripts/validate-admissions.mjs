import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export const validateAdmissions = (data) => {
  const errors = []

  if (!data?.updated_at) errors.push('Thiếu updated_at')
  if (!Array.isArray(data?.schools) || data.schools.length === 0) {
    errors.push('schools phải là mảng không rỗng')
    return errors
  }

  const schoolNames = new Set()

  data.schools.forEach((school, schoolIndex) => {
    const path = `schools[${schoolIndex}]`

    if (!school?.name) errors.push(`${path}.name bị thiếu`)
    if (schoolNames.has(school?.name)) errors.push(`${path}.name bị trùng: ${school?.name}`)
    schoolNames.add(school?.name)
    if (!school?.location) errors.push(`${path}.location bị thiếu`)
    if (![2025, 2026].includes(school?.source_year)) {
      errors.push(`${path}.source_year không hợp lệ: ${school?.source_year}`)
    }
    if (!isHttpsUrl(school?.source_url)) errors.push(`${path}.source_url phải là HTTPS`)
    if (!school?.checked_at) errors.push(`${path}.checked_at bị thiếu`)

    const definitions = school?.combination_definitions ?? {}
    Object.entries(definitions).forEach(([code, subjects]) => {
      if (!code) errors.push(`${path}.combination_definitions có mã rỗng`)
      if (!Array.isArray(subjects) || subjects.length !== 3) {
        errors.push(`${path}.combination_definitions.${code} phải có đúng 3 môn`)
      }
    })

    if (!Array.isArray(school?.majors) || school.majors.length === 0) {
      errors.push(`${path}.majors phải là mảng không rỗng`)
      return
    }

    const majorKeys = new Set()
    school.majors.forEach((major, majorIndex) => {
      const majorPath = `${path}.majors[${majorIndex}]`
      const key = `${major?.code}:${major?.name}`

      if (!major?.code) errors.push(`${majorPath}.code bị thiếu`)
      if (!major?.name) errors.push(`${majorPath}.name bị thiếu`)
      if (majorKeys.has(key)) errors.push(`${majorPath} bị trùng: ${key}`)
      majorKeys.add(key)

      const codes = Array.isArray(major?.combination_codes) ? major.combination_codes : []
      const sets = Array.isArray(major?.subject_sets) ? major.subject_sets : []
      if (codes.length === 0 && sets.length === 0) {
        errors.push(`${majorPath} phải có combination_codes hoặc subject_sets`)
      }

      codes.forEach((code) => {
        if (!definitions[code]) errors.push(`${majorPath} tham chiếu mã chưa định nghĩa: ${code}`)
      })
      sets.forEach((subjects, setIndex) => {
        if (!Array.isArray(subjects) || subjects.length !== 3) {
          errors.push(`${majorPath}.subject_sets[${setIndex}] phải có đúng 3 môn`)
        }
      })
    })
  })

  return errors
}

const runCli = async () => {
  const dataUrl = new URL('../src/data/admissions_verified.json', import.meta.url)
  const data = JSON.parse(await readFile(dataUrl, 'utf8'))
  const errors = validateAdmissions(data)

  if (errors.length > 0) {
    errors.forEach((error) => process.stderr.write(`- ${error}\n`))
    process.exitCode = 1
    return
  }

  const majorCount = data.schools.reduce((total, school) => total + school.majors.length, 0)
  process.stdout.write(
    `Dữ liệu hợp lệ: ${data.schools.length} trường, ${majorCount} ngành, cập nhật ${data.updated_at}.\n`,
  )
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runCli()
}
