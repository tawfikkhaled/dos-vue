import { Card } from "./card";
import Table from "./table";

export class Game {
  dropCenter(center_card: Card) {
    let i = this.center_cards.findIndex(
      (m) => m.color == center_card.color && m.number == center_card.number
    );
    if (i < 0) throw new Error("center card not found");
    this.center_cards.splice(i, 1);
  }
  game_id: string;
  players: string[] = [];
  current_player: string;
  state: string = "INITIAL";
  cards: Card[] = [];
  center_cards: Card[] = [];
  last_played_cards: Card[] = [];
}

export class GameTable extends Table {}
