<script setup lang="ts">
import ConnectionState from "./ConnectionState.vue"
import ConnectionManager from "./ConnectionManager.vue"
import MyForm from "./MyForm.vue"
import MyPlayer from "./MyPlayer.vue"
import CenterPlayer from "./CenterPlayer.vue"
import Others from "./Others.vue"
import Players from "./Players.vue"
import CardHidden from "./CardHidden.vue"
import PlayedCards from  "./PlayedCards.vue"
import { PlayParams } from "@/models/game-state"
import { socket, state } from "@/service/game.socket"
defineProps<{
  msg: string
}>()

function sendBuy() {
        let params = getPlaytParams("BUY");
        socket.emit("play", params);
      }

    
function getPlaytParams(type:string = "EAT"){
        let res = new PlayParams()
        res.cards = state.player.cards.filter(c => c.selected)
        res.center_card = state.gameState.center_cards.filter(c => c.selected)[0]
        res.type = type
        return {game_id:state.gameState?.game_id,
            player_id:state.player?.player_id, playParams:res};
        
      }

      function sendThrow() {
        let params = getPlaytParams("THROW");
        socket.emit("play", params);
      }

      function sendEnd() {
        let params = getPlaytParams("END");
        socket.emit("play", params);
      }

</script>

<template>
<div>
    
    <div style="display: none;">
      <ConnectionManager/>
    <ConnectionState/>
    </div>
    <div class="d-flex flex-column">
        <MyForm/>
      
      <div class="my-2 border-bottom">
        <Players></Players>
      </div>
      
      <div class="row">
        <div class="col-2">
          <CardHidden style="position: absolute; right: 0;" v-on:dblclick="sendBuy" :size="'80px'"></CardHidden>
        </div>
        <div style="height:135px!important" class="col-2 pt-0 px-2 d-flex flex-column">
          <button type="button" v-on:click="sendThrow" class="btn ">throw</button>
        <button type="button" v-on:click="sendEnd" class="btn">end</button>
   
        </div>
        <div class="col-8">
        <MyPlayer :msg="msg"/>

        </div>
        </div>
        <div class="row">
        <div class="col-4">
          <PlayedCards :msg="msg"></PlayedCards>
        </div>
        <div class="col-8">
          <CenterPlayer :msg="msg"></CenterPlayer>

        </div>
      </div>
    </div>
    
    
    
    <Others style="display: none;" :msg="msg"/>

</div>
</template>

<style scoped>
.btn{
  height: 50%;
}
</style>