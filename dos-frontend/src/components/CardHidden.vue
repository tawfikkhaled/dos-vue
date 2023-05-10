<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import {Card} from '../models/game-state';

let props = defineProps<{
  size?: string,
}>()


let dbclicked = function(){
    
}
</script>


<template>
    <div class="card card-wrapper" 
    v-on:dblclick="dbclicked" :style="{'--size-o':props!.size}">
  <div class="card card-content" :style="{'background-color':'black'}">

        <div class="card-center">
  <h1 class="prevent-select card-number card-number-m glow">{{"DOS"}}</h1>
</div>
</div>
  </div>
</template>

<style scoped>
.prevent-select{
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
 * {
      box-sizing: border-box;
    }
    .card-number {
      /*text-align: center;*/
      font-weight: bold;
      font-family: Sans-Serif;
      padding: 0 !important;
      margin: 0 !important;
      font-size: calc(var(--size) * 0.1);
      --shadow-size: calc(var(--size) * 0.003);
      /*padding: calc(var(--shadow-size) * 40)0;*/
    }
    .glow {
      color: #444;
      text-shadow: calc(var(--shadow-size) * 1) calc(var(--shadow-size) * 0)
          calc(var(--shadow-size) * 1) #ccc,
        calc(var(--shadow-size) * 0) calc(var(--shadow-size) * 1)
          calc(var(--shadow-size) * 1) #eee,
        calc(var(--shadow-size) * 2) calc(var(--shadow-size) * 1)
          calc(var(--shadow-size) * 1) #ccc,
        calc(var(--shadow-size) * 1) calc(var(--shadow-size) * 2)
          calc(var(--shadow-size) * 1) #eee,
        calc(var(--shadow-size) * 3) calc(var(--shadow-size) * 2)
          calc(var(--shadow-size) * 1) #ccc,
        calc(var(--shadow-size) * 2) calc(var(--shadow-size) * 3)
          calc(var(--shadow-size) * 1) #eee,
        calc(var(--shadow-size) * 4) calc(var(--shadow-size) * 3)
          calc(var(--shadow-size) * 1) #ccc,
        calc(var(--shadow-size) * 3) calc(var(--shadow-size) * 4)
          calc(var(--shadow-size) * 1) #eee,
        calc(var(--shadow-size) * 5) calc(var(--shadow-size) * 4)
          calc(var(--shadow-size) * 1) #ccc,
        calc(var(--shadow-size) * 4) calc(var(--shadow-size) * 5)
          calc(var(--shadow-size) * 1) #eee,
        calc(var(--shadow-size) * 6) calc(var(--shadow-size) * 5)
          calc(var(--shadow-size) * 1) #ccc,
        calc(var(--shadow-size) * 5) calc(var(--shadow-size) * 6)
          calc(var(--shadow-size) * 1) #eee,
        calc(var(--shadow-size) * 7) calc(var(--shadow-size) * 6)
          calc(var(--shadow-size) * 1) #ccc;
    }
    .card-number-m {
      --shadow-size: calc(var(--size) * 0.005);
      font-size: calc(var(--size) * 0.4);
      position: absolute;
      transform: translate(-50%, -50%);
      left: calc(var(--size-c) / 2.2);
      top: calc(var(--size-c) / 2);
    }

    .card {
      position: relative;
      border-radius: calc(var(--size) / 20);
      font-size: 50px;
      overflow: hidden;
    }

    .card-content {
      position: relative;
      width: var(--size);
      border-radius: calc(var(--size) / 20);
      height: calc(var(--size) * 1.6);
      overflow: hidden;
      top: calc(var(--size) * 0.04);
      left: calc(var(--size) * 0.04);
    }
    .card-center {
      --size-c: calc(var(--size) * 1.1);
      transform: translate(calc(-51%), -50%) rotate(0.9turn);
  
      transform-origin: center;
      left: calc(var(--size) / 2);
      top: calc(var(--size) * 1.6 / 2);
      position: absolute;
      border-radius: 50%;
      height: var(--size-c);
      width: var(--size-c);
      background-color: blue;
    }
    .card-wrapper {
      --size: var(--size-o);
      width: calc(var(--size) * 1.1);
      height: calc(var(--size) * 1.7);
      border: solid #444;
      border-width: calc(var(--size) * 0.01);
      background-color: white;
      /*transform: rotate(0.1turn);*/
    }
</style>
