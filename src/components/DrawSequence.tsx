import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { OracleCard } from './OracleCard'
import { ResultView } from './ResultView'
import { History } from './History'
import { useDailyDraw } from '../hooks/useDailyDraw'
import { useDrawHistory } from '../hooks/useDrawHistory'
import { cards } from '../data/cards'
import type { OracleCard as OracleCardType } from '../data/cards'

// ── 狀態機 ──────────────────────────────────────────────────────────────────
//   idle ──[抽卡]──► channeling ──[1800ms]──► revealing ──[1150ms]──► revealed
//   ▲                                                                      │
//   └──────────────────────────[850ms]─────── resetting ◄──[按鈕]──────────┘
//
//   hasDrawnToday = true 時：頁面載入直接進入 revealed，略過 idle / channeling
type DrawState = 'idle' | 'channeling' | 'revealing' | 'revealed' | 'resetting'

const CHANNELING_MS = 1800
const FLIP_SETTLE_MS = 1150
const RESET_MS = 850

const CHANNELING_LINES = [
  '訊息正在浮現⋯',
  '靜心感受，它在途中⋯',
  '神獸已在傾聽⋯',
  '請放下所有期待⋯',
]

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  onAccentColor?: (color: string | null) => void
}

// ── 元件 ──────────────────────────────────────────────────────────────────
export function DrawSequence({ onAccentColor }: Props) {
  // ── Hooks ────────────────────────────────────────────────────────────
  const prefersReduced = useReducedMotion()
  const { hasDrawnToday, todayCard, saveDraw } = useDailyDraw()
  const { history, addToHistory } = useDrawHistory()

  // ── State ─────────────────────────────────────────────────────────────
  // 若今日已抽過，直接跳到 revealed 並顯示今日牌
  const [drawState, setDrawState] = useState<DrawState>(() =>
    hasDrawnToday ? 'revealed' : 'idle'
  )
  const [selectedCard, setSelectedCard] = useState<OracleCardType>(() =>
    (hasDrawnToday && todayCard) ? todayCard : cards[0]
  )
  const [channelingLine, setChannelingLine] = useState(CHANNELING_LINES[0])
  // 若已抽過，卡片初始就顯示正面（OracleCard 的 rawFlip 依此值初始化）
  const [isFlipped, setIsFlipped] = useState(() => hasDrawnToday)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => () => clearTimers(), [])

  function after(ms: number, fn: () => void) {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }

  // 頁面重載且已抽過：同步背景色
  useEffect(() => {
    if (hasDrawnToday && todayCard) {
      onAccentColor?.(todayCard.color)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 只在 mount 時執行一次

  // 圖片預載：idle 階段用 new Image() 預先載入所有牌卡圖片
  useEffect(() => {
    cards.forEach(card => {
      if (card.image)    { const img = new Image(); img.src = card.image }
      if (card.cardBack) { const img = new Image(); img.src = card.cardBack }
    })
  }, []) // mount 後執行一次即可

  // ── 抽卡流程 ──────────────────────────────────────────────────────────
  function handleDraw() {
    if (drawState !== 'idle') return
    clearTimers()

    const card = pickRandom(cards)
    setSelectedCard(card)
    setChannelingLine(pickRandom(CHANNELING_LINES))
    setIsFlipped(false)
    setDrawState('channeling')
    onAccentColor?.(card.color)   // 儀式感開始，背景同步染色

    after(CHANNELING_MS, () => {
      setDrawState('revealing')
      setIsFlipped(true)

      after(FLIP_SETTLE_MS, () => {
        // React 18 批次更新：三個 setter 合為一次 render
        saveDraw(card)            // → hasDrawnToday 變 true
        addToHistory(card)
        setDrawState('revealed')
      })
    })
  }

  // ── 重置流程 ──────────────────────────────────────────────────────────
  function handleReset() {
    clearTimers()
    setDrawState('resetting')     // ResultView 立刻退場
    setIsFlipped(false)           // 卡片翻回背面
    onAccentColor?.(null)         // 背景色開始淡出

    after(RESET_MS, () => setDrawState('idle'))
  }

  // ── 狀態旗標 ──────────────────────────────────────────────────────────
  const isIdle = drawState === 'idle'
  const isChanneling = drawState === 'channeling'
  const isRevealed = drawState === 'revealed'

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center w-full" style={{ maxWidth: '400px' }}>

      {/* ── 牌卡區域 ───────────────────────────────────────────────────── */}
      <div className="relative flex items-center justify-center py-8">

        {/* channeling 脈動光環（prefersReduced 時略過） */}
        <AnimatePresence>
          {isChanneling && !prefersReduced && (
            <motion.div
              key="channeling-glow"
              className="absolute pointer-events-none"
              style={{
                width: 'min(98vw, 420px)',
                aspectRatio: '2/3',
                borderRadius: '1.25rem',
                background: `radial-gradient(ellipse at 50% 50%,
                  ${selectedCard.color}55 0%,
                  ${selectedCard.color}22 38%,
                  transparent 68%)`,
              }}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{
                opacity: [0, 0.75, 0.45, 0.9, 0.5],
                scale:   [0.88, 1.08, 1.0, 1.14, 1.02],
              }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.55 } }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {/* 浮動包覆層（prefersReduced 時不播放浮動）*/}
        <motion.div
          animate={isIdle && !prefersReduced ? { y: [0, -11, 0] } : { y: 0 }}
          transition={
            isIdle && !prefersReduced
              ? { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.55, ease: 'easeOut' }
          }
        >
          <OracleCard card={selectedCard} flipped={isFlipped} />
        </motion.div>
      </div>

      {/* ── 下方切換區 ────────────────────────────────────────────────── */}
      {/*
        mode="wait"：等前一個元素退場後再讓下一個進場。
        revealed 時顯示 ResultView + History；
        其他狀態顯示抽卡按鈕 / channeling 文字。
      */}
      <AnimatePresence mode="wait">

        {/* ── revealed：結果區塊 ── */}
        {isRevealed && (
          <motion.div
            key="result-section"
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.28, ease: 'easeIn' } }}
          >
            <ResultView
              card={selectedCard}
              onReset={handleReset}
              hasDrawnToday={hasDrawnToday}
            />
            <History history={history} />
          </motion.div>
        )}

        {/* ── 其他狀態：小型控制列 ── */}
        {!isRevealed && (
          <motion.div
            key="controls"
            className="relative flex items-center justify-center"
            style={{ height: '3rem', width: 'min(80vw, 320px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
          >
            <AnimatePresence mode="wait">

              {/* 待機：抽卡按鈕 — 柔和玻璃質感 */}
              {isIdle && (
                <motion.button
                  key="draw-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.22 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDraw}
                  className="whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                    fontSize: '0.82rem',
                    letterSpacing: '0.32em',
                    color: 'rgba(75, 45, 85, 0.72)',
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(190,155,175,0.28)',
                    borderRadius: '9999px',
                    padding: '0.75rem 2.2rem',   // ≥ 44px height
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 20px rgba(155,100,135,0.12), 0 0 0 1px rgba(220,190,210,0.08)',
                    cursor: 'pointer',
                  }}
                >
                  抽取今日訊息
                </motion.button>
              )}

              {/* channeling：呼吸文字 */}
              {isChanneling && (
                <motion.p
                  key="channeling-text"
                  className="text-sm text-center"
                  style={{
                    color: 'rgba(85, 55, 95, 0.55)',
                    letterSpacing: '0.32em',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                  }}
                  initial={{ opacity: 0 }}
                  animate={prefersReduced
                    ? { opacity: 0.55 }
                    : { opacity: [0, 0.6, 0.38, 0.68, 0.45] }
                  }
                  exit={{ opacity: 0, transition: { duration: 0.28 } }}
                  transition={{ duration: CHANNELING_MS / 1000, ease: 'easeInOut' }}
                >
                  {channelingLine}
                </motion.p>
              )}

            </AnimatePresence>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
