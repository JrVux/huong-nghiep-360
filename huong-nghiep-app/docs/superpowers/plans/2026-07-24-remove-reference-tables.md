# Remove Reference Tables Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove reference Tables 1 and 3 from the subject lookup page while retaining Table 2 and all admissions lookup behavior.

**Architecture:** Update the existing `SubjectLookup` page without introducing a new component. A source-level regression test will assert that the removed table headings and their unused data imports are absent while the Table 2 heading remains.

**Tech Stack:** React, Vite, Node.js test runner, oxlint.

## Global Constraints

- Keep the TH1–TH4 selection and verified admissions recommendation logic unchanged.
- Keep “Bảng 2: Điểm chuẩn PTIT 2021–2025”.
- Remove imports, variables, source cards, and markup used only by Tables 1 and 3.

---

### Task 1: Remove Tables 1 and 3

**Files:**
- Modify: `src/pages/SubjectLookup.jsx`
- Modify: `src/pages/SubjectLookup.integration.test.js`

**Interfaces:**
- Consumes: the existing default `SubjectLookup` React component.
- Produces: the same component with only the PTIT score reference table.

- [ ] **Step 1: Write the failing regression test**

Add this test to `src/pages/SubjectLookup.integration.test.js`:

```js
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
```

- [ ] **Step 2: Run the targeted test and verify RED**

Run:

```powershell
node --test src/pages/SubjectLookup.integration.test.js
```

Expected: FAIL because the page still contains the Table 1/Table 3 headings and imports.

- [ ] **Step 3: Remove unused data and markup**

In `src/pages/SubjectLookup.jsx`:

- Delete imports for `to_hop_tin.json` and `to_hop_36.json`.
- Delete `table36Pairs` and `tableTinHoc`.
- Delete the Data1 and Data3 entries from `officialSources`.
- Delete the complete Table 1 and Table 3 `<div className="table-wrapper">` blocks.
- Change the showcase description so it refers only to the retained PTIT score table.
- Keep the existing `tablePTITScores` calculation and Table 2 markup unchanged.

- [ ] **Step 4: Run the targeted test and verify GREEN**

Run:

```powershell
node --test src/pages/SubjectLookup.integration.test.js
```

Expected: all tests in the file PASS.

- [ ] **Step 5: Run complete verification**

Run:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

Expected: zero failed tests, no lint errors, and Vite exits with code 0.

- [ ] **Step 6: Verify the running route**

Run:

```powershell
$response = Invoke-WebRequest -Uri 'http://127.0.0.1:5173/subject-lookup' -UseBasicParsing -TimeoutSec 10
$response.StatusCode
```

Expected: `200`.

Git commit is omitted because the workspace does not contain a valid Git repository.
