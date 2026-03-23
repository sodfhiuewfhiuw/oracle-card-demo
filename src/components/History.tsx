import { motion } from 'framer-motion'
import type { HistoryEntry } from '../hooks/useDrawHistory'

interface Props {
  history: HistoryEntry[]
}

// ── 日期格式化 ────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  // 計算「今天」與「昨天」字串，不依賴 Date.toLocaleDateString 以確保一致性
  const d = new Date()
  const fmt = (date: Date) =>
    [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-')

  if (dateStr === fmt(d)) return '今天'

  const yesterday = new Date(d)
  yesterday.setDate(d.getDate() - 1)
  if (dateStr === fmt(yesterday)) return '昨天'

  const [, m, day] = dateStr.split('-').map(Number)
  return `${m}月${day}日`
}

// ── 元件 ─────────────────────────────────────────────────────────────────
export function History({ history }: Props) {
  if (history.length === 0) return null

  return (
    <motion.div
      className="w-full px-6 pb-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // 等 ResultView 的 stagger 動畫接近完成後才浮現
      transition={{ duration: 0.7, delay: 0.9 }}
    >
      {/* 與 ResultView 之間的分隔線 */}
      <div
        className="mb-8"
        style={{ height: '1px', background: 'rgba(90, 60, 100, 0.08)' }}
      />

      {/* 標題 */}
      <p
        className="text-xs mb-5"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
          color: 'rgba(90, 60, 100, 0.30)',
          letterSpacing: '0.28em',
        }}
      >
        近期紀錄
      </p>

      {/* 紀錄列表 */}
      <ul className="flex flex-col gap-3.5">
        {history.map(entry => (
          <li
            key={`${entry.date}-${entry.cardId}`}
            className="flex items-baseline justify-between gap-4"
          >
            <span
              className="text-sm truncate"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                color: 'rgba(55, 35, 65, 0.55)',
                letterSpacing: '0.08em',
              }}
            >
              {entry.cardName}
            </span>
            <span
              className="text-xs flex-shrink-0"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                color: 'rgba(90, 60, 100, 0.30)',
                letterSpacing: '0.06em',
              }}
            >
              {formatDate(entry.date)}
            </span>
          </li>
        ))}
      </ul>

      {/* 底部說明 */}
      <p
        className="text-xs mt-7"
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 300,
          color: 'rgba(90, 60, 100, 0.20)',
          letterSpacing: '0.18em',
        }}
      >
        紀錄保存於此裝置
      </p>
    </motion.div>
  )
}
