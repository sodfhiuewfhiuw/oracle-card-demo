import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import type { OracleCard as OracleCardType } from '../data/cards'

interface Props {
  card: OracleCardType
  /** 外部控制翻轉狀態；傳入時停用點擊翻牌 */
  flipped?: boolean
}

const TILT_MAX = 12

// 一般彈簧（有物理阻尼感）
const TILT_SPRING  = { stiffness: 220, damping: 28, mass: 0.4 }
const FLIP_SPRING  = { stiffness: 75,  damping: 18, mass: 0.9 }
// 減少動畫模式下使用極快 spring，近乎瞬間完成
const FLIP_SPRING_REDUCED = { stiffness: 2000, damping: 200, mass: 0.1 }

// 兩個面共用的基礎樣式
const faceStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  borderRadius: '1rem',
  overflow: 'hidden',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  WebkitTransform: 'translateZ(0)',
  isolation: 'isolate',
}

export function OracleCard({ card, flipped }: Props) {
  const prefersReduced = useReducedMotion()
  const isControlled = flipped !== undefined
  const [isFlipped, setIsFlipped] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // ── Tilt ────────────────────────────────────────────────────────────────
  const rawTiltX = useMotionValue(0)
  const rawTiltY = useMotionValue(0)
  // 使用者偏好減少動畫時，tilt 維持在 0 不動
  const springTiltX = useSpring(rawTiltX, prefersReduced ? { stiffness: 5000, damping: 500 } : TILT_SPRING)
  const springTiltY = useSpring(rawTiltY, prefersReduced ? { stiffness: 5000, damping: 500 } : TILT_SPRING)

  // ── Flip ────────────────────────────────────────────────────────────────
  const rawFlip = useMotionValue(flipped === true ? 0 : 180)
  const springFlip = useSpring(
    rawFlip,
    prefersReduced ? FLIP_SPRING_REDUCED : FLIP_SPRING
  )

  useEffect(() => {
    if (isControlled) rawFlip.set(flipped ? 0 : 180)
  }, [flipped, isControlled, rawFlip])

  // Combined rotateY = tilt + flip
  const rotateY = useTransform(
    [springTiltY, springFlip],
    ([tilt, flip]: number[]) => tilt + flip
  )

  // ── Glare（warm shimmer，在淺色卡面上效果自然）───────────────────────
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  const glareOpacity = useMotionValue(0)

  const frontGlareBg = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,248,235,0.55) 0%, rgba(255,240,220,0.12) 42%, transparent 66%)`
  )
  const backGlareBg = useTransform(
    [glareX, glareY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${100 - x}% ${y}%, rgba(255,248,235,0.55) 0%, rgba(255,240,220,0.12) 42%, transparent 66%)`
  )

  // ── Event handlers ──────────────────────────────────────────────────────
  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rawTiltX.set((y - 0.5) * -TILT_MAX * 2)
    rawTiltY.set((x - 0.5) * TILT_MAX * 2)
    glareX.set(x * 100)
    glareY.set(y * 100)
  }

  function onMouseEnter() {
    if (!prefersReduced) glareOpacity.set(1)
  }

  function onMouseLeave() {
    rawTiltX.set(0)
    rawTiltY.set(0)
    glareOpacity.set(0)
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (prefersReduced || !e.touches[0]) return
    const el = wrapperRef.current
    if (!el) return
    e.preventDefault()
    const rect = el.getBoundingClientRect()
    const x = (e.touches[0].clientX - rect.left) / rect.width
    const y = (e.touches[0].clientY - rect.top) / rect.height
    rawTiltX.set((y - 0.5) * -TILT_MAX * 2)
    rawTiltY.set((x - 0.5) * TILT_MAX * 2)
    glareX.set(x * 100)
    glareY.set(y * 100)
    glareOpacity.set(1)
  }

  function onTouchEnd() {
    rawTiltX.set(0)
    rawTiltY.set(0)
    glareOpacity.set(0)
  }

  function handleClick() {
    if (isControlled) return
    const next = !isFlipped
    setIsFlipped(next)
    rawFlip.set(next ? 0 : 180)
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    // 外層：提供尺寸 + 承載陰影層，不含 perspective（避免 filter 破壞 3D）
    <div
      style={{
        position: 'relative',
        width: 'min(70vw, 260px)',
        aspectRatio: '2/3',
        flexShrink: 0,
      }}
    >
      {/* ── 柔和陰影層（獨立於 3D 容器，避免 filter 衝突）── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '8px 14px',
          borderRadius: '1.2rem',
          background: 'rgba(120, 70, 100, 0.10)',
          filter: 'blur(22px)',
          transform: 'translateY(10px)',
        }}
      />

      {/* ── 3D 牌卡（perspective 容器）── */}
      <div
        ref={wrapperRef}
        className="cursor-pointer select-none"
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '1200px',
          touchAction: 'none',
        }}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={handleClick}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* card inner — preserve-3d，承載 tilt + flip */}
        <motion.div
          className="w-full h-full"
          style={{ transformStyle: 'preserve-3d', rotateX: springTiltX, rotateY }}
        >

          {/* ── 卡背 ─────────────────────────────────────────────────── */}
          <div style={{ ...faceStyle, transform: 'rotateY(180deg)' }}>
            {card.cardBack ? (
              <img
                src={`${import.meta.env.BASE_URL}${card.cardBack}`}
                alt="card back"
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                }}
              />
            ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 30%, ${card.color}18 0%, transparent 55%),
                  linear-gradient(145deg, #1c0f32 0%, #110a22 55%, #1a0e2e 100%)
                `,
              }}
            >
              <motion.div
                className="absolute rounded-full"
                animate={prefersReduced ? {} : {
                  scale:   [0.55, 0.92, 0.55],
                  opacity: [0.12, 0.38, 0.12],
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '80%', aspectRatio: '1',
                  background: `radial-gradient(circle, ${card.color}28 0%, transparent 68%)`,
                }}
              />
              <motion.div
                className="absolute rounded-full"
                animate={prefersReduced ? {} : {
                  scale:   [0.28, 0.58, 0.28],
                  opacity: [0.22, 0.55, 0.22],
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                style={{
                  width: '44%', aspectRatio: '1',
                  background: `radial-gradient(circle, ${card.color}40 0%, transparent 70%)`,
                }}
              />
              <motion.span
                className="relative z-10"
                animate={prefersReduced ? {} : { opacity: [0.14, 0.40, 0.14] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,240,230,0.22)',
                  fontFamily: 'serif',
                }}
              >
                ✦
              </motion.span>
            </div>
            )}

            {/* 卡背光暈覆層 */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: backGlareBg, opacity: glareOpacity }}
            />
            {/* 邊框 */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: '1rem',
                boxShadow: 'inset 0 0 0 1px rgba(220,195,215,0.10)',
              }}
            />
          </div>

          {/* ── 卡正面 ───────────────────────────────────────────────── */}
          <div
            style={{
              ...faceStyle,
              background: `
                radial-gradient(ellipse at 50% 15%, ${card.color}20 0%, transparent 52%),
                linear-gradient(158deg, #1c0f32 0%, #110a22 60%, #1a0e2e 100%)
              `,
            }}
          >
            {/* 牌面圖片 */}
            {card.image && (
              <img
                src={`${import.meta.env.BASE_URL}${card.image}`}
                alt={card.name}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                }}
              />
            )}
            {/* 底部文字遮罩漸層 */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: '45%',
                background: 'linear-gradient(to top, rgba(10,5,20,0.85) 0%, transparent 100%)',
              }}
            />

            {/* 牌名與關鍵詞（左下角） */}
            <div
              className="absolute inset-0 flex flex-col justify-end"
              style={{ padding: 'clamp(1rem, 5%, 1.4rem)' }}
            >
              <p
                className="mb-1.5"
                style={{
                  fontSize: 'clamp(0.6rem, 2vw, 0.7rem)',
                  letterSpacing: '0.26em',
                  color: 'rgba(220,195,210,0.45)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 300,
                }}
              >
                {card.keyword}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                  letterSpacing: '0.22em',
                  color: 'rgba(250,240,245,0.88)',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 300,
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {card.name}
              </h2>
            </div>

            {/* 光暈覆層 */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: frontGlareBg, opacity: glareOpacity }}
            />
            {/* 邊框 */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: '1rem',
                boxShadow: 'inset 0 0 0 1px rgba(220,195,215,0.10)',
              }}
            />
          </div>

        </motion.div>
      </div>
    </div>
  )
}
