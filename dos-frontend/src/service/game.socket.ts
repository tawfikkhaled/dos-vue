import { reactive } from 'vue'
import { io } from 'socket.io-client'
import { Player, GameState, Card } from '@/models/game-state'

export const state = reactive({
  connected: false,
  gameState: new GameState(),
  cards: [] as Card[],
  center_card: new Card(),
  player: new Player()
})

// "undefined" means the URL will be computed from the `window.location` object
const URL: string =
  process.env.NODE_ENV === 'production' ? 'http://91.169.40.61:33111' : 'http://91.169.40.61:33111'

export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('created', function (data: GameState) {
  console.log('created', data)
  state.gameState = data || state.gameState
})

socket.on('joined', function (data: GameState) {
  console.log('joined', data)
  state.gameState = data || state.gameState
})

socket.on('mejoined', function (data: { state: GameState; me: Player }) {
  console.log('mejoined', data)
  state.gameState = data.state || state.gameState
  state.player = data.me || state.player
})

socket.on('update', function (data: GameState) {
  console.log('update', data)
  state.gameState = data || state.gameState
})

socket.on('meupdate', function (data: Player) {
  console.log('meupdate', data)
  state.player = data || state.player
})
