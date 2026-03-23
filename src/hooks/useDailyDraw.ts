import { useState } from 'react'
import { cards } from '../data/cards'
import type { OracleCard } from '../data/cards'

const STORAGE_KEY = 'oracle_daily_draw'

interface StoredDraw {
  cardId: number
  date: string  // YYYY-MM-DD
}

function todayStr(): string {
  const d = new Date()
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

/** 從 localStorage 讀取今日牌；過期或不存在回傳 null */
function readTodayCard(): OracleCard | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as StoredDraw
    if (data.date !== todayStr()) return null
    return cards.find(c => c.id === data.cardId) ?? null
  } catch {
    return null
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────
export function useDailyDraw() {
  // 以 lazy initializer 讀取初始值，避免每次 render 重讀 localStorage
  const [todayCard, setTodayCard] = useState<OracleCard | null>(readTodayCard)

  /** 抽牌後呼叫，將牌 id + 今日日期寫入 localStorage，並同步 state */
  function saveDraw(card: OracleCard) {
    const data: StoredDraw = { cardId: card.id, date: todayStr() }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // 私密模式或 localStorage 不可用時，靜默略過
    }
    setTodayCard(card)
  }

  return {
    hasDrawnToday: todayCard !== null,
    todayCard,
    saveDraw,
  }
}
