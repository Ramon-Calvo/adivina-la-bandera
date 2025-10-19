export interface Country {
  name: {
    common: string
    official: string
  }
  flags: {
    png: string
    svg: string
  }
  cca2: string
}

export interface GameState {
  score: number
  streak: number
  currentCountry: Country | null
  options: Country[]
  answered: boolean
}

export interface HighScore {
  score: number
  date: string
  streak: number
}
