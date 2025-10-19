import { FlagAPI } from './api'
import type { Country, GameState } from './types'

export class FlagGame {
  private api: FlagAPI
  private state: GameState
  private elements!: {
    flagImage: HTMLImageElement
    optionsContainer: HTMLDivElement
    scoreDisplay: HTMLSpanElement
    streakDisplay: HTMLSpanElement
    feedbackDisplay: HTMLDivElement
    nextButton: HTMLButtonElement
    resetButton: HTMLButtonElement
    loadingDisplay: HTMLDivElement
    gameContainer: HTMLDivElement
  }

  constructor() {
    this.api = new FlagAPI()
    this.state = {
      score: 0,
      streak: 0,
      currentCountry: null,
      options: [],
      answered: false
    }
  }

  private initElements(): void {
    this.elements = {
      flagImage: document.getElementById('flag-image') as HTMLImageElement,
      optionsContainer: document.getElementById('options') as HTMLDivElement,
      scoreDisplay: document.getElementById('score') as HTMLSpanElement,
      streakDisplay: document.getElementById('streak') as HTMLSpanElement,
      feedbackDisplay: document.getElementById('feedback') as HTMLDivElement,
      nextButton: document.getElementById('next-btn') as HTMLButtonElement,
      resetButton: document.getElementById('reset-btn') as HTMLButtonElement,
      loadingDisplay: document.getElementById('loading') as HTMLDivElement,
      gameContainer: document.getElementById('game-container') as HTMLDivElement
    }
  }

  async init(): Promise<void> {
    this.initElements()
    this.showLoading(true)
    
    try {
      await this.api.fetchAllCountries()
      this.setupEventListeners()
      this.loadNewQuestion()
      this.showLoading(false)
    } catch (error) {
      console.error('Error al inicializar el juego:', error)
      this.elements.feedbackDisplay.textContent = 'Error al cargar las banderas. Por favor, recarga la página.'
      this.elements.feedbackDisplay.classList.remove('hidden')
    }
  }

  private setupEventListeners(): void {
    this.elements.nextButton.addEventListener('click', () => {
      this.loadNewQuestion()
    })

    this.elements.resetButton.addEventListener('click', () => {
      this.resetGame()
    })
  }

  private loadNewQuestion(): void {
    this.state.answered = false
    this.elements.feedbackDisplay.classList.add('hidden')
    this.elements.nextButton.classList.add('hidden')
    
    const correctCountry = this.api.getRandomCountry()
    const wrongCountries = this.api.getRandomCountries(3)
      .filter(c => c.cca2 !== correctCountry.cca2)
      .slice(0, 3)
    
    this.state.currentCountry = correctCountry
    this.state.options = [...wrongCountries, correctCountry]
      .sort(() => Math.random() - 0.5)
    
    this.renderQuestion()
  }

  private renderQuestion(): void {
    if (!this.state.currentCountry) return
    
    this.elements.flagImage.src = this.state.currentCountry.flags.svg
    this.elements.flagImage.alt = `Bandera de ${this.state.currentCountry.name.common}`
    
    this.elements.optionsContainer.innerHTML = ''
    
    this.state.options.forEach(country => {
      const button = document.createElement('button')
      button.className = 'option-btn'
      button.textContent = country.name.common
      button.addEventListener('click', () => this.handleAnswer(country))
      this.elements.optionsContainer.appendChild(button)
    })
  }

  private handleAnswer(selectedCountry: Country): void {
    if (this.state.answered || !this.state.currentCountry) return
    
    this.state.answered = true
    const isCorrect = selectedCountry.cca2 === this.state.currentCountry.cca2
    
    const buttons = this.elements.optionsContainer.querySelectorAll('.option-btn')
    buttons.forEach(btn => {
      const button = btn as HTMLButtonElement
      button.disabled = true
      
      if (button.textContent === this.state.currentCountry!.name.common) {
        button.classList.add('correct')
      }
      
      if (button.textContent === selectedCountry.name.common && !isCorrect) {
        button.classList.add('incorrect')
      }
    })
    
    if (isCorrect) {
      this.state.score += 10
      this.state.streak += 1
      this.showFeedback('¡Respuesta correcta!', 'success')
    } else {
      this.state.streak = 0
      this.showFeedback(`Incorrecto. La respuesta correcta es ${this.state.currentCountry.name.common}`, 'error')
    }
    
    this.updateDisplay()
    this.elements.nextButton.classList.remove('hidden')
  }

  private showFeedback(message: string, type: 'success' | 'error'): void {
    this.elements.feedbackDisplay.textContent = message
    this.elements.feedbackDisplay.className = `feedback ${type}`
  }

  private updateDisplay(): void {
    this.elements.scoreDisplay.textContent = `${this.state.score}`
    this.elements.streakDisplay.textContent = `${this.state.streak}`
  }

  private resetGame(): void {
    this.state.score = 0
    this.state.streak = 0
    this.updateDisplay()
    this.loadNewQuestion()
  }

  private showLoading(show: boolean): void {
    if (show) {
      this.elements.loadingDisplay.classList.remove('hidden')
      this.elements.gameContainer.classList.add('hidden')
    } else {
      this.elements.loadingDisplay.classList.add('hidden')
      this.elements.gameContainer.classList.remove('hidden')
    }
  }
}
