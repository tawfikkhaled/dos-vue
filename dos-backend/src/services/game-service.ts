import { Card } from "../models/card";
import { Game } from "../models/game";
import { Player } from "../models/player";
import { DbProvider } from "./providers/dbProvider";
import { getDbProvider } from "./providers/provider";
import { v4 as uuid } from "uuid";

export class MemoryGameService {
  dbProvider: DbProvider;
  constructor() {
    this.dbProvider = getDbProvider("memory");
  }
  data = { games: {}, players: {} };
  createNewGame(): Promise<Game> {
    let game = new Game();
    game.game_id = uuid();
    game.cards = [...Array(88)]
      .map((v, i) => i)
      .sort((a, b) => 0.5 - Math.random())
      .map((v, i) => {
        return new Card(Math.floor(v / 11) % 11, Card.colors[v % 4]);
      });
    this.fixCenter(game);

    return this.saveGame(game);
  }
  getGame(game_id): Promise<Game> {
    let game = this.data.games[game_id];
    let res = new Promise<Game>((resolve, reject) => {
      resolve(game);
    });
    return res;
  }
  saveGame(game: Game): Promise<Game> {
    let res = new Promise<Game>((resolve, reject) => {
      this.data["games"][game.game_id] = game;
      this.data["players"][game.game_id] =
        this.data["players"][game.game_id] || {};
      resolve(game);
    });
    return res;
  }
  addPlayerToGame(game: Game, player: Player): void {
    game.players.push(player.player_id);
    if (game.current_player == undefined)
      game.current_player = player.player_id;
    let cards = [...Array(7)].map((i) => game.cards.pop());
    player.cards = cards;
  }

  createNewPlayer(game_id: string): Promise<Player> {
    let player = new Player();
    player.game_id = game_id;
    player.player_id = uuid();

    return this.getGame(game_id).then((game) => {
      this.addPlayerToGame(game, player);
      return this.saveGame(game).then((game) => this.savePlayer(player));
    });
  }

  savePlayer(player: Player): Promise<Player> {
    let res = new Promise<Player>((resolve, reject) => {
      this.data["players"][player.game_id][player.player_id] = player;
      resolve(player);
    });
    return res;
  }
  getPlayer(game_id, player_id): Promise<Player> {
    let res = new Promise<Player>((resolve, reject) => {
      let game = this.data.games[game_id];
      if (!game) throw new Error("game not found");
      let player = this.data["players"][game_id][player_id];
      resolve(player);
    });
    return res;
  }
  fixCenter(game: Game) {
    let nc = 2 - game.center_cards.length;
    for (let i = 0; i < nc; i++) {
      let card = game.cards.pop();
      game.center_cards.push(card);
    }
  }
}
const memoryGameService = new MemoryGameService();
export function getGameService(env) {
  switch (env) {
    default:
      return memoryGameService;
  }
}
