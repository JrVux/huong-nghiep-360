const SUBJECT_ALIASES = new Map([
  ['van', 'ngu van'],
  ['ngu van', 'ngu van'],
  ['su', 'lich su'],
  ['lich su', 'lich su'],
  ['ly', 'vat li'],
  ['vat ly', 'vat li'],
  ['vat li', 'vat li'],
  ['hoa', 'hoa hoc'],
  ['hoa hoc', 'hoa hoc'],
  ['sinh', 'sinh hoc'],
  ['sinh hoc', 'sinh hoc'],
  ['anh', 'tieng anh'],
  ['tieng anh', 'tieng anh'],
  ['dia', 'dia li'],
  ['dia ly', 'dia li'],
  ['dia li', 'dia li'],
  ['tin', 'tin hoc'],
  ['tin hoc', 'tin hoc'],
  ['gdkt&pl', 'giao duc kinh te va phap luat'],
  ['giao duc kinh te va phap luat', 'giao duc kinh te va phap luat'],
])

const stripVietnamese = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()

export const normalizeSubject = (value) => {
  const normalized = stripVietnamese(value)
  return SUBJECT_ALIASES.get(normalized) ?? normalized
}

export const COMPULSORY_SUBJECTS =
  ['Toán', 'Ngữ văn', 'Tiếng Anh', 'Lịch sử'].map(normalizeSubject)

export const buildStudentSubjectSet = (group) =>
  new Set([
    ...COMPULSORY_SUBJECTS,
    ...(Array.isArray(group?.mon) ? group.mon : []).map(normalizeSubject),
  ])
