<script setup lang="ts">
import { socket, state } from '@/service/game.socket';
import Card from './Card.vue';
import { PlayParams } from '@/models/game-state';
defineProps<{
  msg: string
}>()

function getPlaytParams(type:string = "EAT"){
        let res = new PlayParams()
        res.cards = state.player.cards.filter(c => c.selected)
        res.center_card = state.gameState.center_cards.filter(c => c.selected)[0]
        res.type = type
        return {game_id:state.gameState?.game_id,
            player_id:state.player?.player_id, playParams:res};
        
      }

function sendPlay() {
        let params = getPlaytParams();
        socket.emit("play", params);
      }

function generateKey(c:any) {
      const uniqueKey = `${c.number}-${c.color}-${c.selected}`+Math.random();
      return uniqueKey;
    }
let size = "80px"
let sizeint = Number.parseFloat(size.substring(0,size.length - 2))
</script>

<template>
<div v-on:dblclick="sendPlay" :style="{'height': sizeint * 2+'px'}">
  <template v-for=" (card, ind) in state.gameState.last_played_cards" :index="ind" :key="generateKey(card)">
    <div :style="{'position':'absolute', 'right':sizeint * ind / 3 +'px', 'z-index': 10+state.gameState.last_played_cards.length-ind
}">
    <Card  :card="card" :size="size" :selectable="false"  ></Card>
    </div>
  </template>
  <button v-on:click="sendPlay" :style="{'display' : state.gameState.last_played_cards.length>0 ? 'none' : 'ok' }"> play </button>
  
</div>
</template>


<style scoped>
</style>