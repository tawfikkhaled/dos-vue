<script setup lang="ts">
import { state } from '@/service/game.socket';
import Card from './Card.vue';
import type { Player } from '@/models/game-state';
import CardHidden from './CardHidden.vue';

function generateKey(c:Player) {
      const uniqueKey = `${c.player_id}`+Math.random();
      return uniqueKey;
    }

let size = "80px"
let sizeint = Number.parseFloat(size.substring(0,size.length - 2))
</script>

<template>
<div class="row d-flex justify-content-around">
  <template v-for=" (player, ind) in state.gameState.players" :index="ind" :key="generateKey(player)">
    <div style="width: 50px; text-align: center;" :class="{'mine' : state.player.player_id?.startsWith(player.player_id  || '-1'), 'current' : state.gameState.current_player?.startsWith(player.player_id  || '-1'), }" > {{ player.cards.length }}</div>
  
  </template>
  
</div>
</template>


<style scoped>
.mine{
  border: solid 1px blue;
}
.current::before{
  content: "->";
}
</style>