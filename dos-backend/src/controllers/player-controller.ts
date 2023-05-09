import { Router } from "express";
import { v4 as uuid } from "uuid";
const router = Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now(), "player router");
  next();
});

router.get("/new", (req, res) => {
  res.send({
    player_id: uuid(),
    game_id: "",
    cards: [],
  });
});

router.post("/:game_id/play", (req, res) => {
  console.log("posting to game:", req.params.game_id, req.body);
  res.send({ success: true });
});
export const gameRouter = router;
