import { Card } from "./card";

export class Player {
  player_id: string;
  game_id: string;

  cards: Card[] = [];
  whiteplay: number = 0;
  next_player: string;
  name: string;
  state: string = "INITIAL";
  drop(cards: Card[]): void {
    let v = cards.filter(
      (c) =>
        this.cards.filter((m) => m.color == c.color && m.number == c.number)
          .length == 0
    );
    if (v.length > 0) {
      throw new Error("card not in player");
    }
    cards.map((c) => {
      let i = this.cards.findIndex(
        (m) => m.color == c.color && m.number == c.number
      );
      this.cards.splice(i, 1);
    });
  }

  summary() {
    let res = new Player();
    res.player_id = this.player_id.substring(0, 5);
    res.cards = this.cards.map((c) => undefined);
    return res;
  }
}
