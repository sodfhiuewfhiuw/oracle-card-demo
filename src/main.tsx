import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { brand } from './data/brand'

// 讓 <title> 與 <meta description> 統一由 brand.ts 控制
document.title = brand.pageTitle
document.querySelector('meta[name="description"]')
  ?.setAttribute('content', brand.metaDescription)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
