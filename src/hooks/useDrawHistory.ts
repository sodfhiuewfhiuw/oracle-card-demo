import { useState } from 'react'
import type { OracleCard } from '../data/cards'

const STORAGE_KEY = 'oracle_draw_history'
const MAX_ENTRIES = 30

export interface HistoryEntry {
  cardId: number
  cardName: string
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

function readHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as HistoryEntry[]
  } catch {
    return []
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────
export function useDrawHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(readHistory)

  /**
   * 將本次抽到的牌加入歷史。
   * - 同一天只保留一筆（重複抽時覆蓋）
   * - 超過 MAX_ENTRIES 時刪除最舊的
   */
  function addToHistory(card: OracleCard) {
    setHistory(prev => {
      const today = todayStr()
      // 移除同一天的舊紀錄，避免重複
      const filtered = prev.filter(e => e.date !== today)
      const entry: HistoryEntry = {
        cardId: card.id,
        cardName: card.name,
        date: today,
      }
      const next = [entry, ...filtered].slice(0, MAX_ENTRIES)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // 靜默略過
      }
      return next
    })
  }

  return { history, addToHistory }
}
