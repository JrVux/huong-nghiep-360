import test from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

test('render mặc định hiển thị dữ liệu tuyển sinh đã xác minh', async () => {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  })

  try {
    const module = await vite.ssrLoadModule('/src/pages/SubjectLookup.jsx')
    const html = renderToString(createElement(module.default))

    assert.match(html, /A00/)
    assert.match(html, /source-year-badge/)
    assert.match(html, /Đại học Cần Thơ/)
    assert.match(html, /Trường Đại học Mở Thành phố Hồ Chí Minh/)
  } finally {
    await vite.close()
  }
})
