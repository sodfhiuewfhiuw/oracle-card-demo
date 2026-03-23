import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DrawSequence } from './components/DrawSequence'
import { brand } from './data/brand'
import './index.css'

export default function App() {
  const [accentColor, setAccentColor] = useState<string | null>(null)

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        // 多層柔和漸層：淡粉 + 淺紫 + 米白，米白為底
        background: `
          radial-gradient(ellipse at 12% 8%,  #fce8ee88 0%, transparent 40%),
          radial-gradient(ellipse at 88% 5%,  #ece7f888 0%, transparent 42%),
          radial-gradient(ellipse at 25% 95%, #fef0ea88 0%, transparent 45%),
          radial-gradient(ellipse at 78% 88%, #eee6f688 0%, transparent 40%),
          linear-gradient(165deg, #fdfaf7 0%, #f8f0fa 52%, #fdf5f6 100%)
        `,
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* ── 牌卡色調氛圍層（revealed 時浮現）────────────────────────────── */}
      <AnimatePresence>
        {accentColor && (
          <motion.div
            key={accentColor}
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 50% 0%,   ${accentColor}14 0%, transparent 50%),
                radial-gradient(ellipse at 50% 100%, ${accentColor}0a 0%, transparent 45%)
              `,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* ── 靜態裝飾點（玫瑰金調） ──────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 15% 10%, rgba(180,130,150,0.22) 0%, transparent 100%),
            radial-gradient(2px 2px at 82% 22%, rgba(160,110,140,0.16) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 65%, rgba(170,120,150,0.14) 0%, transparent 100%),
            radial-gradient(2px 2px at  8% 80%, rgba(180,130,155,0.18) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 72%, rgba(155,110,140,0.13) 0%, transparent 100%),
            radial-gradient(1px 1px at 42% 92%, rgba(165,120,145,0.11) 0%, transparent 100%)
          `,
        }}
      />

      {/* ── 品牌標題 ─────────────────────────────────────────────────────── */}
      <header className="relative z-10 flex flex-col items-center pt-12 pb-0 flex-shrink-0">
        {/* 小標籤 */}
        <p
          className="text-xs mb-2"
          style={{
            color: 'rgba(140, 95, 120, 0.45)',
            letterSpacing: '0.55em',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
          }}
        >
          {brand.label}
        </p>

        {/* 主標題：Noto Serif TC，有質感的靈性感 */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontSize: 'clamp(1.55rem, 4.5vw, 2.1rem)',
            letterSpacing: '0.42em',
            color: 'rgba(55, 30, 65, 0.82)',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {brand.title}
        </h1>

        {/* 副標題 */}
        <p
          className="mt-3"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            fontSize: 'clamp(0.7rem, 2.2vw, 0.82rem)',
            letterSpacing: '0.22em',
            color: 'rgba(100, 65, 110, 0.45)',
            lineHeight: 1.6,
          }}
        >
          {brand.subtitle}
        </p>
      </header>

      {/* ── 主體 ─────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center w-full py-6">
        <DrawSequence onAccentColor={setAccentColor} />
      </main>
    </div>
  )
}
