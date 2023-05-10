<template>
    
    <form @submit.prevent="onCreate" class="row">
        <input class="col-10" v-model="state.gameState.game_id" :disabled="isLoading || state.gameState.game_id!=undefined"  />
      <button type="submit" class="col-2" :disabled="isLoading || state.gameState.game_id!=undefined" placeholder="game_id...">create</button>
    </form>
    <form @submit.prevent="onJoin" class="row">
      <input class="col-10" v-model="state.player.player_id" :disabled="isLoading|| state.player.player_id!=undefined"  />
  
      <button class="col-2" type="submit" placeholder="player_id...">join</button>
    </form>

  </template>
  
  
  <script lang="ts">
  import { PlayParams } from "@/models/game-state";
import { socket, state } from "../service/game.socket";
  
  export default {
    name: "MyForm",
  
    data() {
      return {
        isLoading: false,
        state:state
      }
    },
  
    methods: {
      onCreate() {
        this.isLoading = true;
  
        socket.timeout(500).emit("create", () => {
          this.isLoading = false;
        });
      },
      onJoin() {
        this.isLoading = true;
  
        socket.timeout(500).emit("join", {gameState:state.gameState, player_id:state.player.player_id}, () => {
          this.isLoading = false;
        });
      },
       sendPlay() {
        let params = this.getPlaytParams();
        socket.emit("play", params);
      },
       sendThrow() {
        let params = this.getPlaytParams("THROW");
        socket.emit("play", params);
      },
       sendBuy() {
        let params = this.getPlaytParams("BUY");
        socket.emit("play", params);
      },
       sendEnd() {
        let params = this.getPlaytParams("END");
        socket.emit("play", params);
      },
      getPlaytParams(type:string = "EAT"){
        let res = new PlayParams()
        res.cards = state.player.cards.filter(c => c.selected)
        res.center_card = state.gameState.center_cards.filter(c => c.selected)[0]
        res.type = type
        return {game_id:state.gameState?.game_id,
            player_id:state.player?.player_id, playParams:res};
        
      }
    }
  }
  </script>