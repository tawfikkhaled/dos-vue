import { MemoryGameService } from "../services/game-service";
import { Card } from "./card";
import { Game } from "./game";
import { Player } from "./player";

export class GameState {
  game_id: string;
  players: Player[] = [];
  current_player: string;
  state: string = "INITIAL";
  center_cards: Card[] = [];
  last_played_cards: Card[] = [];
  static from(game: Game, service: MemoryGameService): Promise<GameState> {
    let gameState = new GameState();
    gameState.game_id = game.game_id;
    gameState.center_cards = game.center_cards;
    gameState.last_played_cards = game.last_played_cards;
    gameState.current_player = game.current_player?.substring(0, 5);
    let req = new Promise((resolve, reject) => {
      resolve(undefined);
    });
    for (let i = 0; i < game.players.length; i++) {
      req.then((ps) => {
        service.getPlayer(game.game_id, game.players[i]).then((p) => {
          gameState.players.push(p.summary());
        });
      });
    }
    return req.then(() => {
      return gameState;
    });
  }
}
