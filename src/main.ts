import './style.css'
import { FlagGame } from './game'

// Esperar a que el DOM esté completamente cargado
window.addEventListener('load', () => {
  const game = new FlagGame()
  game.init()
})
