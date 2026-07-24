# Module 3 2026 Highlight Data Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update Module 3 so it highlights the newest 2026 subject combinations and shows a few representative schools with cutoff-score examples for related majors.

**Architecture:** Keep the current combination lookup flow intact. Add one compact data file for 2026 featured combinations and one compact data file for school examples, then render both as additional sections inside the existing `SubjectLookup` page. Style the new sections to match the current cards so the screen stays readable and easy to hand to students.

**Tech Stack:** React, Vite, JSON data files, CSS modules via imported stylesheet.

---

### Task 1: Add featured 2026 data files

**Files:**
- Create: `E:\du an huong nghiep 2026\huong-nghiep-app\src\data\to_hop_2026_noi_bat.json`
- Create: `E:\du an huong nghiep 2026\huong-nghiep-app\src\data\truong_tieu_bieu_2026.json`

- [ ] **Step 1: Define the 2026 featured combinations**

```json
{
  "nguon": "Thong tin tuyen sinh dai hoc chinh quy nam 2026 cua Hoc vien Cong nghe Buu chinh Vien thong (PTIT)",
  "nam_cap_nhat": 2026,
  "ghi_chu": "Cac to hop duoi day la cac to hop xet tuyen chinh thuc nam 2026 cua PTIT.",
  "data": [
    { "ma": "A00", "mon": ["Toan", "Vat li", "Hoa hoc"], "truong_tieu_bieu": "PTIT" },
    { "ma": "A01", "mon": ["Toan", "Vat li", "Tieng Anh"], "truong_tieu_bieu": "PTIT" },
    { "ma": "D01", "mon": ["Toan", "Ngu van", "Tieng Anh"], "truong_tieu_bieu": "PTIT" },
    { "ma": "X06", "mon": ["Toan", "Vat li", "Tin hoc"], "truong_tieu_bieu": "PTIT" },
    { "ma": "X26", "mon": ["Toan", "Tin hoc", "Tieng Anh"], "truong_tieu_bieu": "PTIT" }
  ]
}
```

- [ ] **Step 2: Define school examples with cutoff-score references**

```json
{
  "nguon": "Tong hop tu trang tuyen sinh chinh thuc va du lieu tham khao trong app",
  "nam_cap_nhat": 2026,
  "data": [
    {
      "truong": "Hoc vien Cong nghe Buu chinh Vien thong (PTIT)",
      "website": "https://tuyensinh.ptit.edu.vn/",
      "mo_ta": "Nhom nganh CNTT, vien thong, an toan thong tin phu hop voi cac to hop moi A00, A01, D01, X06, X26.",
      "nganh_noi_bat": [
        { "ten": "Cong nghe thong tin", "diem": "25.80 / 23.47", "ghi_chu": "PTIT 2025" },
        { "ten": "An toan thong tin", "diem": "25.21 / 23.09", "ghi_chu": "PTIT 2025" },
        { "ten": "Tri tue nhan tao", "diem": "25.67", "ghi_chu": "PTIT 2025" }
      ],
      "to_hop_lien_quan": ["A00", "A01", "D01", "X06", "X26"]
    },
    {
      "truong": "DH Cong nghe Thong tin - DHQG TP.HCM (UIT)",
      "website": "https://tuyensinh.uit.edu.vn/",
      "mo_ta": "Vi du nhom nganh CNTT, du lieu, phan mem va AI.",
      "nganh_noi_bat": [
        { "ten": "Khoa hoc may tinh", "diem": "27.2", "ghi_chu": "2025 - tham khao" },
        { "ten": "Ky thuat phan mem", "diem": "27.1", "ghi_chu": "2025 - tham khao" },
        { "ten": "Tri tue nhan tao", "diem": "27.5", "ghi_chu": "2025 - tham khao" }
      ],
      "to_hop_lien_quan": ["A00", "A01", "D01", "D07", "X06", "X26"]
    }
  ]
}
```

- [ ] **Step 3: Keep the files compact and readable**

Use simple flat arrays so the UI can render cards directly without extra transformation logic.

### Task 2: Render the new highlight sections in Module 3

**Files:**
- Modify: `E:\du an huong nghiep 2026\huong-nghiep-app\src\pages\SubjectLookup.jsx`

- [ ] **Step 1: Import the new data files**

```jsx
import toHop2026NoiBat from '../data/to_hop_2026_noi_bat.json'
import truongTieuBieu2026 from '../data/truong_tieu_bieu_2026.json'
```

- [ ] **Step 2: Add two new sections below the existing combo detail**

```jsx
<section className="lookup-section featured-section">
  <div className="section-heading">
    <h2>To hop 2026 noi bat</h2>
    <p>Cac to hop chinh thuc dang duoc nhieu truong CNTT, vien thong va du lieu su dung.</p>
  </div>
  <div className="featured-grid">
    {featuredCombos.map((combo) => (
      <article key={combo.ma} className="featured-card">
        <div className="featured-card-top">
          <span className="featured-badge">{combo.ma}</span>
          <span className="featured-meta">{combo.truong_tieu_bieu}</span>
        </div>
        <p className="featured-subjects">{combo.mon.join(' + ')}</p>
        <p className="featured-note">{combo.mo_ta}</p>
      </article>
    ))}
  </div>
</section>

<section className="lookup-section school-section">
  <div className="section-heading">
    <h2>Truong tieu bieu co diem chuan</h2>
    <p>Vi du tham khao cac nganh lien quan den CNTT, AI, du lieu va giao duc.</p>
  </div>
  <div className="school-grid">
    {schoolHighlights.map((school) => (
      <article key={school.truong} className="school-card">
        <div className="school-card-header">
          <h3>{school.truong}</h3>
          <a href={school.website} target="_blank" rel="noreferrer">Nguon</a>
        </div>
        <p className="school-description">{school.mo_ta}</p>
        <div className="major-list">
          {school.nganh_noi_bat.map((major) => (
            <div key={major.ten} className="major-item">
              <div className="major-row">
                <strong>{major.ten}</strong>
                <span>{major.diem}</span>
              </div>
              <p>{major.ghi_chu}</p>
            </div>
          ))}
        </div>
      </article>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Keep the current lookup flow unchanged**

Do not remove the current combination selector, possible-combo list, or the existing warning/info boxes.

### Task 3: Style the new cards

**Files:**
- Modify: `E:\du an huong nghiep 2026\huong-nghiep-app\src\styles\Lookup.css`

- [ ] **Step 1: Add section heading styles**

```css
.section-heading {
  display: grid;
  gap: 0.35rem;
}

.section-heading p {
  margin: 0;
  color: var(--text-soft);
}
```

- [ ] **Step 2: Add featured combination card styles**

```css
.featured-grid,
.school-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.9rem;
}

.featured-card,
.school-card {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}
```

- [ ] **Step 3: Add school score chip styles**

```css
.major-item {
  padding: 0.8rem;
  border-radius: 14px;
  background: rgba(248, 250, 252, 0.9);
}
```

### Task 4: Verify the app still builds

**Files:**
- Modify: none

- [ ] **Step 1: Run the production build**

Run: `npm run build`
Expected: build completes without errors.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: lint passes cleanly.

---

**Coverage check:** The plan covers the new 2026 combo data, the school-score examples, the React page changes, the CSS updates, and the required verification commands.
