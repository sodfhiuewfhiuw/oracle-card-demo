import { motion } from 'framer-motion'
import type { OracleCard } from '../data/cards'
import { brand } from '../data/brand'

interface Props {
  card: OracleCard
  onReset: () => void
  /** true = 今日已抽過，隱藏「再抽一次」並顯示提示訊息 */
  hasDrawnToday: boolean
}

// ── 動畫 variants ─────────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.17, delayChildren: 0.08 },
  },
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: EASE },
  },
}

// ── 元件 ─────────────────────────────────────────────────────────────────
// exit 動畫交由 DrawSequence 的父層包覆容器負責，ResultView 本身只處理進場
export function ResultView({ card, onReset, hasDrawnToday }: Props) {
  const accent = card.color

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col items-center px-6 pb-14"
    >

      {/* ── 卡名 ─────────────────────────────────────────────────────── */}
      <motion.h2
        variants={item}
        className="text-center font-light mt-2 mb-5"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.65rem, 6vw, 2.2rem)',
          letterSpacing: '0.28em',
          color: 'rgba(55, 30, 65, 0.90)',
        }}
      >
        {card.name}
      </motion.h2>

      {/* ── 關鍵詞標籤 ───────────────────────────────────────────────── */}
      <motion.div variants={item} className="mb-9">
        <span
          className="inline-block px-5 py-1.5 rounded-full text-xs"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            letterSpacing: '0.26em',
            color: 'rgba(75, 45, 85, 0.72)',
            border: `1px solid ${accent}55`,
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: `0 0 18px ${accent}18`,
          }}
        >
          {card.keyword}
        </span>
      </motion.div>

      {/* ── 彩色分隔線 ────────────────────────────────────────────────── */}
      <motion.div
        variants={item}
        className="mb-9"
        style={{
          width: '2.5rem',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${accent}70, transparent)`,
        }}
      />

      {/* ── 今日訊息 ──────────────────────────────────────────────────── */}
      <motion.div variants={item} className="w-full mb-8">
        <p
          className="text-xs mb-3"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            color: 'rgba(80, 50, 90, 0.40)',
            letterSpacing: '0.28em',
          }}
        >
          今日訊息
        </p>
        <p
          className="text-sm"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            color: 'rgba(55, 35, 65, 0.75)',
            lineHeight: '2.0',
            letterSpacing: '0.04em',
          }}
        >
          {card.message}
        </p>
      </motion.div>

      {/* ── 延伸指引 ──────────────────────────────────────────────────── */}
      <motion.div variants={item} className="w-full mb-11">
        <p
          className="text-xs mb-3"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            color: 'rgba(80, 50, 90, 0.40)',
            letterSpacing: '0.28em',
          }}
        >
          延伸指引
        </p>
        <p
          className="text-sm"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            color: 'rgba(55, 35, 65, 0.58)',
            lineHeight: '2.0',
            letterSpacing: '0.04em',
          }}
        >
          {card.guidance}
        </p>
      </motion.div>

      {/* ── 按鈕列 ────────────────────────────────────────────────────── */}
      <motion.div variants={item} className="w-full flex flex-col gap-3">

        {/* 前往 Instagram — 永遠顯示 */}
        <motion.a
          href={brand.igUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center rounded-2xl text-sm"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            padding: '0.85rem 1rem',   // ≥ 44px height
            color: 'rgba(65, 35, 75, 0.80)',
            letterSpacing: '0.20em',
            background: 'rgba(255,255,255,0.72)',
            border: `1px solid ${accent}55`,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: `0 2px 20px ${accent}14, 0 0 0 1px rgba(220,190,210,0.08)`,
            textDecoration: 'none',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18 }}
        >
          {brand.igButtonText}
        </motion.a>

        {/*
          今日已抽：顯示鎖定提示，隱藏「再抽一次」
          尚未抽：顯示重抽按鈕
        */}
        {hasDrawnToday ? (
          <p
            className="text-center py-3 text-xs"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              color: 'rgba(90, 60, 100, 0.35)',
              letterSpacing: '0.14em',
              lineHeight: '1.7',
            }}
          >
            你今天已收到一則訊息
            <br />
            明天再來看看吧
          </p>
        ) : (
          <motion.button
            onClick={onReset}
            className="w-full rounded-2xl text-sm"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              padding: '0.85rem 1rem',   // ≥ 44px height
              color: 'rgba(75, 45, 85, 0.38)',
              letterSpacing: '0.20em',
              background: 'transparent',
              border: '1px solid rgba(180,145,165,0.22)',
              cursor: 'pointer',
            }}
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            再抽一次
          </motion.button>
        )}

      </motion.div>
    </motion.div>
  )
}
