import { Router } from "express";
import { getGameService } from "../services/game-service";
import { PlayParams } from "../models/playParams";
import { GameExecutionService } from "../services/game-execution-service";
import { GameState } from "../models/game.state";

const router = Router();
const service = getGameService(process.env.NODE_ENV);
const exec_service = new GameExecutionService(service);

router.use((req, res, next) => {
  console.log("Time: ", Date.now(), "game router");
  next();
});

router.get("/:game_id/new", (req, res) => {
  service
    .createNewPlayer(req.params.game_id)
    .then((player) => {
      res.send(player);
    })
    .catch(() => res.send({ success: false }));
});
router.get("/:game_id/:player_id", (req, res) => {
  service
    .getPlayer(req.params.game_id, req.params.player_id)
    .then((player) => {
      res.send(player);
    })
    .catch(() => res.send({ success: false }));
});

router.get("/:game_id/:player_id", (req, res) => {
  service
    .getPlayer(req.params.game_id, req.params.player_id)
    .then((player) => res.send(player))
    .catch(() => res.send({ success: false }));
});

router.get("/new", (req, res) => {
  service
    .createNewGame()
    .then((game) => {
      res.send(game);
    })
    .catch(() => res.send({ success: false }));
});
router.get("/:game_id", (req, res) => {
  service
    .getGame(req.params.game_id)
    .then((game) => {
      return GameState.from(game, service);
    })
    .then((g) => {
      res.send({ game_state: g });
    })
    .catch(() => res.send({ success: false }));
});

router.post("/:game_id/:player_id/play", (req, res) => {
  console.log("posting to game:", req.params.game_id, req.body as PlayParams);
  exec_service
    .play(req.params.game_id, req.params.player_id, req.body as PlayParams)
    .then(() => res.send({ success: true }))
    .catch(() => res.send({ success: false }));
});

export const gameRouter = router;
