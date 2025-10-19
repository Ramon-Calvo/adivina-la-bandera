import type { HighScore } from './types'

const STORAGE_KEY = 'flag-game-scores'
const MAX_SCORES = 10

export class StorageManager {
  saveScore(score: number, streak: number): void {
    const scores = this.getHighScores()
    
    const newScore: HighScore = {
      score,
      streak,
      date: new Date().toISOString()
    }
    
    scores.push(newScore)
    scores.sort((a, b) => b.score - a.score)
    
    const topScores = scores.slice(0, MAX_SCORES)
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores))
  }

  getHighScores(): HighScore[] {
    const stored = localStorage.getItem(STORAGE_KEY)
    
    if (!stored) {
      return []
    }
    
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }

  clearScores(): void {
    localStorage.removeItem(STORAGE_KEY)
  }

  getBestScore(): number {
    const scores = this.getHighScores()
    return scores.length > 0 ? scores[0].score : 0
  }
}
