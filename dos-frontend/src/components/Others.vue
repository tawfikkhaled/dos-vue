<script setup lang="ts">
import { state } from '@/service/game.socket';
</script>

<template>
<div>
  <template v-for=" player in state.gameState.players">
    <div :value="player">{{ player }}</div>
  </template>
  
</div>
</template>


<style scoped>
</style>