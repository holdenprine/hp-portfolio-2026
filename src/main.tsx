import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// test the following urls for the following debug statements: 
// http://localhost:5173/?date=2026-01-15 gives winter
// http://localhost:5173/?date=2026-04-15 gives spring
// http://localhost:5173/?date=2026-07-15 gives summer
// http://localhost:5173/?date=2026-10-15 gives fall

// Debug: add ?date=YYYY-MM-DD to the URL to fake today's date
const debugDate = new URLSearchParams(window.location.search).get('date')
// 'T00:00' keeps it local midnight; a bare YYYY-MM-DD parses as UTC and can land on the previous day
const fakeNow = debugDate ? new Date(`${debugDate}T00:00`) : null

const now = fakeNow && !isNaN(fakeNow.getTime()) ? fakeNow : new Date();
const month = now.getMonth();

document.documentElement.dataset.season =
  month <= 1 || month === 11 ? 'winter'
  : month <= 4 ? 'spring'
  : month <= 7 ? 'summer'
  : 'fall'

if (debugDate) console.log('[date debug]', now.toDateString(), '->', document.documentElement.dataset.season)
// forces "dark mode"
document.documentElement.dataset.theme = 'dark'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
