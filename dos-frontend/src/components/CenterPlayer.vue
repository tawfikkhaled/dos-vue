<script setup lang="ts">
import { state } from '@/service/game.socket';
import Card from './Card.vue';
defineProps<{
  msg: string
}>()
function generateKey(c:any) {
      const uniqueKey = `${c.number}-${c.color}-${c.selected}`+Math.random();
      return uniqueKey;
    }

let size = "80px"
let sizeint = Number.parseFloat(size.substring(0,size.length - 2))
</script>

<template>
<div :style="{'height': sizeint * 2.2+'px', display:'flex'}">
  <template v-for=" (card, ind) in state.gameState.center_cards" :index="ind" :key="generateKey(card)">
    <div >
    <Card  :selectable="true" :card="card" :size="size"  ></Card>
    </div>
  </template>
  
</div>
</template>


<style scoped>
</style>