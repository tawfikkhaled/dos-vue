export class GameState {
  game_id?: string
  current_player?: string
  players: Player[] = []
  center_cards: Card[] = []
  last_played_cards: Card[] = []
  state: string = 'INITIAL'
}

export class Player {
  player_id?: string
  cards: Card[] = []
}
export class Card {
  number: number = 0
  color: string = 'RED'
  selected: boolean = false
}

export class PlayParams {
  type: string = 'EAT'
  cards: Card[] = []
  center_card?: Card
}
