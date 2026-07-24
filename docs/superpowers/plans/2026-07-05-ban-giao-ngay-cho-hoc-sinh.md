# Handover-Ready Student App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the existing orientation app so it is clean, coherent, and ready to hand to students for practice.

**Architecture:** Keep the current React/Vite structure and data model. Focus on shared layout polish, page-level style alignment, and a small export-flow cleanup so the app feels stable without changing the underlying learning content.

**Tech Stack:** React 19, Vite, React Router, plain CSS, JSON seed data, html2canvas, jsPDF.

---

### Task 1: Normalize the shared UI foundation

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.css`

- [ ] **Step 1: Replace the broken global stylesheet with a clean base**

```css
/* clean reset, theme tokens, typography, page shell */
```

- [ ] **Step 2: Rework the app shell styles for mobile-first navigation and footer**

```css
/* sticky nav, page spacing, footer grid, button tokens */
```

- [ ] **Step 3: Build the app and verify the shell styles do not break routing**

Run: `cmd /c npm run build`
Expected: production build succeeds.

### Task 2: Align page styles with the existing JSX

**Files:**
- Modify: `src/styles/HomePage.css`
- Modify: `src/styles/Test.css`
- Modify: `src/styles/Results.css`
- Modify: `src/styles/Lookup.css`
- Modify: `src/styles/ITCareer.css`

- [ ] **Step 1: Add missing layout classes used by each page component**

```css
/* add the missing selectors for current JSX class names */
```

- [ ] **Step 2: Improve card spacing, hierarchy, and responsive behavior**

```css
/* adjust grids, paddings, buttons, and section wrappers */
```

- [ ] **Step 3: Build and inspect that all pages still compile**

Run: `cmd /c npm run build`
Expected: production build succeeds.

### Task 3: Polish navigation and export flow

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/hooks/usePdfExport.js`

- [ ] **Step 1: Switch nav links to active-aware routing and improve labels**

```jsx
// use NavLink and active classes for clearer navigation state
```

- [ ] **Step 2: Make PDF export safer for multi-page results**

```js
// improve page splitting and keep the generated PDF readable
```

- [ ] **Step 3: Rebuild and lint to verify no regression**

Run: `cmd /c npm run build`
Run: `cmd /c npm run lint`
Expected: both commands succeed.

### Task 4: Final verification for handoff

**Files:**
- No code changes expected

- [ ] **Step 1: Confirm the student-facing flow still works end to end**

Run: `cmd /c npm run build`
Run: `cmd /c npm run lint`
Expected: both succeed.

- [ ] **Step 2: Review the app as a teacher-ready handoff**

Check: homepage, MBTI, Holland, subject lookup, IT career page, and PDF export entry points.

