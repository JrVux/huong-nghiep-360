# Module tra cứu tuyển sinh đầy đủ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Giữ nguyên luồng TH1–TH4, tính chính xác mọi tổ hợp đại học ba môn phù hợp và hiển thị tối đa 5 trường cùng khoảng 10 ngành đã được xác minh bằng nguồn tuyển sinh chính thức 2026 hoặc 2025.

**Architecture:** Tách chuẩn hóa môn, bộ máy tính tổ hợp và kho dữ liệu tuyển sinh khỏi component React. Dữ liệu nguồn chính thức được nghiên cứu trước, lưu cục bộ dưới dạng JSON có URL/năm/ngày kiểm tra, rồi được validator kiểm tra trước khi UI sử dụng.

**Tech Stack:** React 19, Vite 8, JavaScript ES modules, Node.js built-in test runner, JSON tĩnh, Oxlint.

## Global Constraints

- Giữ nguyên luồng giao diện hai bước TH1–TH4.
- Mỗi TH gồm 4 môn bắt buộc và 4 môn tự chọn.
- Mỗi tổ hợp đại học phải có đúng 3 môn và cả 3 môn phải thuộc 8 môn của TH.
- Mỗi tổ hợp hiển thị tối đa 5 trường và khoảng 10 ngành đã xác minh.
- Ưu tiên trường tại TP.HCM và Cần Thơ; sau đó là cơ sở/phân hiệu và trường uy tín phía Nam.
- Ưu tiên dữ liệu chính thức năm 2026; chỉ dùng năm 2025 khi chưa có dữ liệu 2026 đầy đủ.
- Mỗi kết quả trường/ngành phải có URL nguồn chính thức, năm dữ liệu và ngày kiểm tra.
- Không gọi Internet trong thời gian người dùng sử dụng module.
- Không thêm backend hoặc thư viện runtime mới.

---

## File Map

- Create `huong-nghiep-app/src/features/subjectLookup/subjects.js`: chuẩn hóa tên môn và tập 8 môn.
- Create `huong-nghiep-app/src/features/subjectLookup/subjects.test.js`: kiểm thử bí danh tên môn.
- Create `huong-nghiep-app/src/features/subjectLookup/combinations.js`: tính tổ hợp phù hợp và hợp nhất mã tổ hợp.
- Create `huong-nghiep-app/src/features/subjectLookup/combinations.test.js`: kiểm thử TH1–TH4 và A00/A01/B00.
- Create `huong-nghiep-app/src/features/subjectLookup/admissions.js`: đọc, lọc và xếp hạng trường/ngành.
- Create `huong-nghiep-app/src/features/subjectLookup/admissions.test.js`: kiểm thử giới hạn, năm và ưu tiên khu vực.
- Create `huong-nghiep-app/src/data/admissions_verified.json`: dữ liệu tuyển sinh đã xác minh.
- Create `huong-nghiep-app/scripts/validate-admissions.mjs`: kiểm tra schema và tính nhất quán dữ liệu.
- Create `huong-nghiep-app/scripts/validate-admissions.test.mjs`: kiểm thử validator bằng fixture nhỏ.
- Modify `huong-nghiep-app/src/pages/SubjectLookup.jsx`: sử dụng các module mới và render dữ liệu xác minh.
- Modify `huong-nghiep-app/src/styles/Lookup.css`: nhãn năm, nguồn, xu hướng và bố cục chi tiết.
- Modify `huong-nghiep-app/package.json`: thêm lệnh test và kiểm tra dữ liệu.
- Delete `huong-nghiep-app/src/pages/SubjectLookup.test.js`: thay kiểm thử chuỗi nguồn bằng kiểm thử hành vi.

---

### Task 1: Chuẩn hóa tên môn

**Files:**
- Create: `huong-nghiep-app/src/features/subjectLookup/subjects.js`
- Test: `huong-nghiep-app/src/features/subjectLookup/subjects.test.js`

**Interfaces:**
- Produces: `normalizeSubject(value: unknown): string`
- Produces: `buildStudentSubjectSet(group: {mon?: string[]} | null): Set<string>`
- Produces: `COMPULSORY_SUBJECTS: string[]`

- [ ] **Step 1: Viết kiểm thử thất bại cho bí danh và tập tám môn**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeSubject, buildStudentSubjectSet } from './subjects.js'

test('chuẩn hóa các tên môn tương đương', () => {
  assert.equal(normalizeSubject('Văn'), 'ngu van')
  assert.equal(normalizeSubject('Sử'), 'lich su')
  assert.equal(normalizeSubject('Vật lý'), 'vat li')
  assert.equal(normalizeSubject('Lý'), 'vat li')
  assert.equal(normalizeSubject('Hóa'), 'hoa hoc')
  assert.equal(normalizeSubject('Anh'), 'tieng anh')
})

test('tạo đúng tám môn cho TH1', () => {
  const subjects = buildStudentSubjectSet({
    mon: ['Vật Lí', 'Hóa học', 'Sinh học', 'Công nghệ nông nghiệp'],
  })
  assert.equal(subjects.size, 8)
  assert.equal(subjects.has('ngu van'), true)
  assert.equal(subjects.has('lich su'), true)
})
```

- [ ] **Step 2: Chạy kiểm thử để xác nhận RED**

Run: `cd huong-nghiep-app && node --test src/features/subjectLookup/subjects.test.js`

Expected: FAIL với `ERR_MODULE_NOT_FOUND` cho `subjects.js`.

- [ ] **Step 3: Cài đặt tối thiểu**

```js
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
```

- [ ] **Step 4: Chạy kiểm thử để xác nhận GREEN**

Run: `cd huong-nghiep-app && node --test src/features/subjectLookup/subjects.test.js`

Expected: 2 tests, 2 pass, 0 fail.

- [ ] **Step 5: Commit**

```bash
git add huong-nghiep-app/src/features/subjectLookup/subjects.js huong-nghiep-app/src/features/subjectLookup/subjects.test.js
git commit -m "feat: normalize subject names for lookup"
```

Nếu workspace vẫn không có metadata Git hợp lệ, ghi nhận và tiếp tục mà không khởi tạo repository mới.

---

### Task 2: Bộ máy tính tổ hợp đại học

**Files:**
- Create: `huong-nghiep-app/src/features/subjectLookup/combinations.js`
- Test: `huong-nghiep-app/src/features/subjectLookup/combinations.test.js`

**Interfaces:**
- Consumes: `normalizeSubject`, `buildStudentSubjectSet`
- Produces: `buildCombinationCatalog(...catalogs): Combination[]`
- Produces: `findMatchingCombinations(group, catalog): Combination[]`

- [ ] **Step 1: Viết kiểm thử thất bại cho điều kiện ba môn**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { findMatchingCombinations } from './combinations.js'

const catalog = [
  { ma: 'A00', mon: ['Toán', 'Vật Lí', 'Hóa học'] },
  { ma: 'A01', mon: ['Toán', 'Vật Lí', 'Tiếng Anh'] },
  { ma: 'B00', mon: ['Toán', 'Hóa học', 'Sinh học'] },
  { ma: 'C00', mon: ['Ngữ văn', 'Lịch sử', 'Địa lí'] },
]

test('TH1 nhận A00 A01 B00 nhưng không nhận C00', () => {
  const group = { mon: ['Vật Lí', 'Hóa học', 'Sinh học', 'Công nghệ nông nghiệp'] }
  assert.deepEqual(
    findMatchingCombinations(group, catalog).map((item) => item.ma),
    ['A00', 'A01', 'B00'],
  )
})

test('không nhận bản ghi không có đúng ba môn', () => {
  const group = { mon: ['Vật Lí', 'Hóa học', 'Sinh học', 'Tin học'] }
  const invalid = [{ ma: 'BAD', mon: ['Toán', 'Vật Lí'] }]
  assert.deepEqual(findMatchingCombinations(group, invalid), [])
})
```

- [ ] **Step 2: Chạy kiểm thử để xác nhận RED**

Run: `cd huong-nghiep-app && node --test src/features/subjectLookup/combinations.test.js`

Expected: FAIL với `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Cài đặt bộ máy**

```js
import { buildStudentSubjectSet, normalizeSubject } from './subjects.js'

const sortByCode = (left, right) =>
  left.ma.localeCompare(right.ma, 'vi', { numeric: true })

export const buildCombinationCatalog = (...catalogs) => {
  const byCode = new Map()
  catalogs.flat().forEach((combo) => {
    if (!combo?.ma || !Array.isArray(combo.mon)) return
    const normalized = combo.mon.map(normalizeSubject)
    const existing = byCode.get(combo.ma)
    if (existing && existing.normalized.join('|') !== normalized.join('|')) {
      throw new Error(`Mâu thuẫn môn cho tổ hợp ${combo.ma}`)
    }
    byCode.set(combo.ma, { ...combo, normalized })
  })
  return [...byCode.values()].sort(sortByCode)
}

export const findMatchingCombinations = (group, catalog) => {
  const subjects = buildStudentSubjectSet(group)
  return buildCombinationCatalog(catalog)
    .filter((combo) =>
      combo.normalized.length === 3 &&
      combo.normalized.every((subject) => subjects.has(subject)),
    )
}
```

- [ ] **Step 4: Chạy kiểm thử và kiểm tra cả bốn TH**

Run: `cd huong-nghiep-app && node --test src/features/subjectLookup/combinations.test.js`

Expected: 2 tests, 2 pass, 0 fail.

Thêm một test đọc `to_hop_lop10_truong.json`, `to_hop_a_b_c_chi_tiet.json` và `to_hop_tin.json`; với mỗi TH, assert mọi kết quả có đúng 3 môn và mọi môn thuộc tập 8 môn.

- [ ] **Step 5: Commit**

```bash
git add huong-nghiep-app/src/features/subjectLookup/combinations.js huong-nghiep-app/src/features/subjectLookup/combinations.test.js
git commit -m "feat: calculate matching university combinations"
```

---

### Task 3: Nghiên cứu và xây bộ dữ liệu nguồn chính thức

**Files:**
- Create: `huong-nghiep-app/src/data/admissions_verified.json`
- Create: `huong-nghiep-app/docs/admissions-sources.md`

**Interfaces:**
- Produces JSON root `{ "updated_at": "YYYY-MM-DD", "combinations": [...] }`
- Mỗi nguồn ngành có `source_url`, `source_title`, `source_year`, `checked_at`

- [ ] **Step 1: Lập danh sách mã tổ hợp thực tế cần nghiên cứu**

Chạy một script chỉ đọc dữ liệu hiện tại để lấy hợp của kết quả TH1–TH4. Ghi bảng mã và ba môn vào `huong-nghiep-app/docs/admissions-sources.md`. Không nghiên cứu mã không thể sinh ra từ bốn TH.

- [ ] **Step 2: Tra cứu nguồn chính thức theo từng mã**

Với mỗi mã, tìm theo thứ tự:

1. Đề án/thông báo tuyển sinh 2026 trên website trường tại TP.HCM.
2. Đề án/thông báo tuyển sinh 2026 trên website trường tại Cần Thơ.
3. Nguồn 2026 của cơ sở/phân hiệu hoặc trường phía Nam.
4. Nếu chưa đủ, lặp lại với nguồn chính thức 2025.

Trong `admissions-sources.md`, mỗi dòng dùng cấu trúc:

```md
| A00 | Đại học ... | 7480201 | Công nghệ thông tin | 2026 | TP.HCM | https://... | 2026-07-24 |
```

- [ ] **Step 3: Kiểm chứng chéo trước khi nhập JSON**

Mỗi dòng chỉ được chấp nhận khi trang/PDF chính thức đồng thời xác nhận:

- Đúng tên trường.
- Đúng ngành hoặc mã ngành.
- Đúng tổ hợp xét tuyển.
- Đúng năm tuyển sinh.

Điểm chuẩn chỉ nhập khi nguồn ghi rõ phương thức và thang điểm.

- [ ] **Step 4: Tạo JSON dữ liệu**

```json
{
  "updated_at": "2026-07-24",
  "combinations": [
    {
      "ma": "A00",
      "schools": [
        {
          "name": "Tên trường",
          "location": "TP.HCM",
          "location_type": "tru_so",
          "website": "https://tên-miền-chính-thức/",
          "source_year": 2026,
          "majors": [
            {
              "code": "7480201",
              "name": "Công nghệ thông tin",
              "trend_tags": ["Công nghệ", "Nhu cầu nhân lực"],
              "trend_reason": "Chuyển đổi số và nhu cầu nhân lực phần mềm.",
              "latest_score": {
                "year": 2025,
                "method": "Điểm thi tốt nghiệp THPT",
                "scale": 30,
                "value": 26.5
              },
              "source_url": "https://nguon-chinh-thuc/",
              "source_title": "Thông tin tuyển sinh năm 2026",
              "source_year": 2026,
              "checked_at": "2026-07-24"
            }
          ]
        }
      ]
    }
  ]
}
```

Không dùng giá trị minh họa trên trong dữ liệu thật. Mỗi tổ hợp tối đa 5 trường; chọn ngành tiêu biểu từ chính các trường đã xác minh.

- [ ] **Step 5: Rà soát độ phủ**

Xuất báo cáo gồm: số mã tổ hợp, số mã có ít nhất một trường, số trường/ngành mỗi mã, số nguồn 2026 và số nguồn dự phòng 2025. Ghi rõ các mã chưa đủ nguồn thay vì điền giả.

- [ ] **Step 6: Commit**

```bash
git add huong-nghiep-app/src/data/admissions_verified.json huong-nghiep-app/docs/admissions-sources.md
git commit -m "data: add verified admissions sources"
```

---

### Task 4: Validator dữ liệu tuyển sinh

**Files:**
- Create: `huong-nghiep-app/scripts/validate-admissions.mjs`
- Test: `huong-nghiep-app/scripts/validate-admissions.test.mjs`
- Modify: `huong-nghiep-app/package.json`

**Interfaces:**
- Produces: `validateAdmissions(data): string[]`
- Adds scripts: `"test": "node --test"` and `"validate:data": "node scripts/validate-admissions.mjs"`

- [ ] **Step 1: Viết kiểm thử thất bại**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { validateAdmissions } from './validate-admissions.mjs'

test('báo lỗi nguồn không chính thức và quá năm cho phép', () => {
  const errors = validateAdmissions({
    updated_at: '2026-07-24',
    combinations: [{
      ma: 'A00',
      schools: [{
        name: 'Trường thử',
        location: 'TP.HCM',
        source_year: 2024,
        majors: [{
          code: '7480201',
          name: 'CNTT',
          source_url: '',
          source_year: 2024,
          checked_at: '2026-07-24'
        }]
      }]
    }]
  })
  assert.equal(errors.some((value) => value.includes('source_url')), true)
  assert.equal(errors.some((value) => value.includes('2024')), true)
})
```

- [ ] **Step 2: Chạy để xác nhận RED**

Run: `cd huong-nghiep-app && node --test scripts/validate-admissions.test.mjs`

Expected: FAIL với `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Cài đặt validator**

Validator phải trả về lỗi cho: mã thiếu/trùng, hơn 5 trường, trường trùng trong một mã, năm ngoài 2025–2026, ngành thiếu mã/tên/URL/ngày kiểm tra, URL không phải HTTPS, và điểm có `value` nhưng thiếu `method` hoặc `scale`.

CLI đọc `src/data/admissions_verified.json`, in từng lỗi và đặt `process.exitCode = 1`; nếu hợp lệ in số tổ hợp, trường và ngành rồi thoát 0.

- [ ] **Step 4: Thêm script package**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview",
    "test": "node --test",
    "validate:data": "node scripts/validate-admissions.mjs"
  }
}
```

- [ ] **Step 5: Chạy GREEN và kiểm tra dữ liệu thật**

Run: `cd huong-nghiep-app && npm.cmd test`

Expected: tất cả tests pass.

Run: `cd huong-nghiep-app && npm.cmd run validate:data`

Expected: exit 0 và báo cáo không có lỗi.

- [ ] **Step 6: Commit**

```bash
git add huong-nghiep-app/scripts/validate-admissions.mjs huong-nghiep-app/scripts/validate-admissions.test.mjs huong-nghiep-app/package.json
git commit -m "test: validate verified admissions data"
```

---

### Task 5: Kho dữ liệu và xếp hạng kết quả

**Files:**
- Create: `huong-nghiep-app/src/features/subjectLookup/admissions.js`
- Test: `huong-nghiep-app/src/features/subjectLookup/admissions.test.js`

**Interfaces:**
- Produces: `getAdmissionsForCombination(code, data): { schools, featuredMajors }`
- `schools` có tối đa 5 phần tử.
- `featuredMajors` có tối đa 10 phần tử và chỉ lấy từ `schools`.

- [ ] **Step 1: Viết kiểm thử thất bại cho giới hạn và ưu tiên**

Tạo fixture 6 trường gồm TP.HCM 2026, Cần Thơ 2026, phía Nam 2026 và TP.HCM 2025. Assert:

- Chỉ trả tối đa 5 trường.
- Bản ghi 2026 đứng trước 2025 khi các tiêu chí còn lại bằng nhau.
- TP.HCM/Cần Thơ đứng trước trường bổ sung phía Nam.
- `featuredMajors.length <= 10`.
- Mọi ngành nổi bật xuất phát từ một trường trong danh sách đã chọn.

- [ ] **Step 2: Chạy để xác nhận RED**

Run: `cd huong-nghiep-app && node --test src/features/subjectLookup/admissions.test.js`

Expected: FAIL với `ERR_MODULE_NOT_FOUND`.

- [ ] **Step 3: Cài đặt xếp hạng xác định**

```js
const locationRank = (location) => {
  if (location === 'TP.HCM') return 0
  if (location === 'Cần Thơ') return 1
  return 2
}

export const getAdmissionsForCombination = (code, data) => {
  const entry = data.combinations.find((item) => item.ma === code)
  const schools = [...(entry?.schools ?? [])]
    .sort((left, right) =>
      right.source_year - left.source_year ||
      locationRank(left.location) - locationRank(right.location) ||
      right.majors.length - left.majors.length ||
      left.name.localeCompare(right.name, 'vi'),
    )
    .slice(0, 5)

  const featuredMajors = schools
    .flatMap((school) =>
      school.majors.map((major) => ({ ...major, school: school.name })),
    )
    .sort((left, right) =>
      Number(right.trend_tags?.length > 0) - Number(left.trend_tags?.length > 0) ||
      left.name.localeCompare(right.name, 'vi'),
    )
    .slice(0, 10)

  return { schools, featuredMajors }
}
```

- [ ] **Step 4: Chạy GREEN**

Run: `cd huong-nghiep-app && node --test src/features/subjectLookup/admissions.test.js`

Expected: tất cả tests pass.

- [ ] **Step 5: Commit**

```bash
git add huong-nghiep-app/src/features/subjectLookup/admissions.js huong-nghiep-app/src/features/subjectLookup/admissions.test.js
git commit -m "feat: rank verified schools and majors"
```

---

### Task 6: Tích hợp UI Module 3

**Files:**
- Modify: `huong-nghiep-app/src/pages/SubjectLookup.jsx`
- Modify: `huong-nghiep-app/src/styles/Lookup.css`
- Delete: `huong-nghiep-app/src/pages/SubjectLookup.test.js`
- Create: `huong-nghiep-app/src/pages/SubjectLookup.integration.test.js`

**Interfaces:**
- Consumes: `findMatchingCombinations`
- Consumes: `getAdmissionsForCombination`
- Consumes: `admissions_verified.json`

- [ ] **Step 1: Viết kiểm thử thất bại cho hợp đồng tích hợp**

Trong `combinations.test.js`, đọc dữ liệu JSON thật và assert cho mọi kết quả TH1–TH4:

```js
for (const group of groups) {
  for (const combo of findMatchingCombinations(group, catalog)) {
    assert.equal(combo.normalized.length, 3)
    const result = getAdmissionsForCombination(combo.ma, admissions)
    assert.equal(result.schools.length <= 5, true)
    assert.equal(result.featuredMajors.length <= 10, true)
  }
}
```

Tạo `SubjectLookup.integration.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('SubjectLookup dùng combination engine và admissions repository', async () => {
  const source = await readFile(new URL('./SubjectLookup.jsx', import.meta.url), 'utf8')
  assert.match(source, /findMatchingCombinations/)
  assert.match(source, /getAdmissionsForCombination/)
  assert.match(source, /admissions_verified\.json/)
})
```

- [ ] **Step 2: Chạy kiểm thử trước tích hợp để xác nhận RED**

Run: `cd huong-nghiep-app && npm.cmd test`

Expected: FAIL ở `SubjectLookup.integration.test.js` vì component chưa import các module mới.

- [ ] **Step 3: Thay logic nội bộ trong `SubjectLookup.jsx`**

Import:

```js
import admissionsData from '../data/admissions_verified.json'
import { findMatchingCombinations } from '../features/subjectLookup/combinations'
import { buildStudentSubjectSet } from '../features/subjectLookup/subjects'
import { getAdmissionsForCombination } from '../features/subjectLookup/admissions'
```

Tạo view model:

```js
const studentSubjects = buildStudentSubjectSet(selectedTH)
const matchingCombos = findMatchingCombinations(selectedTH, comboCatalog)
  .map((combo) => ({
    ...combo,
    ...getAdmissionsForCombination(combo.ma, admissionsData),
  }))
```

Xóa các hàm trùng trách nhiệm: `normalizeText`, `getStudentSubjects`, `isComboMatching`, `getRelatedSchools`, `getTopMajors`.

- [ ] **Step 4: Cập nhật thẻ tổ hợp**

Mỗi thẻ phải hiển thị:

- Mã và ba môn.
- Số trường đã xác minh.
- Số ngành nổi bật.
- Tối đa 10 ngành nổi bật kèm nhãn xu hướng và trường.
- Tối đa 5 khối trường có địa điểm, năm dữ liệu và danh sách ngành.
- Điểm chuẩn kèm năm/phương thức/thang điểm khi có.
- Link `Mở nguồn tuyển sinh chính thức`.
- Trạng thái thiếu dữ liệu khi `schools.length === 0`.

- [ ] **Step 5: Cập nhật CSS**

Thêm các class:

```css
.source-year-badge {}
.location-badge {}
.trend-tag {}
.trend-reason {}
.verified-source-link {}
.admission-empty-state {}
```

Giữ responsive hiện tại; ở màn hình dưới 768px, thông tin trường và ngành xếp một cột, bảng dữ liệu vẫn cuộn ngang.

- [ ] **Step 6: Chạy kiểm thử, lint và build**

Run: `cd huong-nghiep-app && npm.cmd test`

Expected: 0 failures.

Run: `cd huong-nghiep-app && npm.cmd run validate:data`

Expected: exit 0.

Run: `cd huong-nghiep-app && npm.cmd run lint`

Expected: exit 0.

Run: `cd huong-nghiep-app && npm.cmd run build`

Expected: Vite build thành công.

- [ ] **Step 7: Commit**

```bash
git add huong-nghiep-app/src/pages/SubjectLookup.jsx huong-nghiep-app/src/styles/Lookup.css huong-nghiep-app/src/pages/SubjectLookup.test.js huong-nghiep-app/src/pages/SubjectLookup.integration.test.js
git commit -m "feat: show verified admissions in subject lookup"
```

---

### Task 7: Kiểm tra trình duyệt và báo cáo độ phủ

**Files:**
- Create: `huong-nghiep-app/docs/module-3-verification.md`

**Interfaces:**
- Produces báo cáo kiểm tra cuối cùng, không thay đổi API nội bộ.

- [ ] **Step 1: Chạy ứng dụng**

Run: `cd huong-nghiep-app && npm.cmd run dev -- --host 127.0.0.1 --port 5173`

Expected: route `http://127.0.0.1:5173/subject-lookup` trả HTTP 200.

- [ ] **Step 2: Kiểm tra TH1–TH4 trong trình duyệt**

Với từng TH:

- Xác nhận số môn là 8.
- Ghi số tổ hợp đại học.
- Mở tối thiểu A00, A01, B00 và một tổ hợp có Ngữ văn/Lịch sử khi chúng phù hợp.
- Xác nhận không quá 5 trường và 10 ngành.
- Mở thử ít nhất một link nguồn của mỗi mã có dữ liệu.
- Kiểm tra không có lỗi console.

- [ ] **Step 3: Kiểm tra responsive**

Kiểm tra ở 375×812, 768×1024 và 1440×900. Xác nhận nút TH, thẻ ngành, chi tiết trường và bảng dữ liệu không tràn ngang ngoài vùng cuộn được thiết kế.

- [ ] **Step 4: Viết báo cáo**

`module-3-verification.md` phải ghi:

- Tổng số mã tổ hợp sinh ra từ TH1–TH4.
- Số mã có dữ liệu trường và số mã chưa đủ nguồn.
- Tổng số trường, ngành, nguồn 2026 và nguồn 2025.
- Kết quả test, validator, lint, build và kiểm tra trình duyệt.
- Hạn chế dữ liệu còn lại, không dùng câu khẳng định vượt quá bằng chứng.

- [ ] **Step 5: Chạy verification cuối**

Run:

```powershell
npm.cmd test
npm.cmd run validate:data
npm.cmd run lint
npm.cmd run build
```

Expected: tất cả exit 0 và không có test fail.

- [ ] **Step 6: Commit**

```bash
git add huong-nghiep-app/docs/module-3-verification.md
git commit -m "docs: verify module 3 admissions lookup"
```

Nếu Git chưa hợp lệ, báo rõ trong bàn giao rằng các thay đổi chưa được commit.
