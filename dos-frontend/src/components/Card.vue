<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import {Card} from '../models/game-state';
import { getCurrentInstance } from 'vue';
import { state } from '@/service/game.socket';
let props = defineProps<{
  card?: Card,
  size?: string,
  selectable?: boolean,
}>()
const emit = defineEmits(['dbclick'])

const card = reactive(props.card!)

watch(card, (newValue, oldValue) => {
  console.log("update card")
  getCurrentInstance()?.proxy?.$forceUpdate();
}, {
  deep:true
})

let colorMap:any = {
  "RED": "red",
  "GREEN": "green",
  "BLUE": "blue",
 "YELLOW": "yellow"
} 

const bgcolor = computed(() => {
  return (card!.number == 2)  ? 'black' :  colorMap[card!.color]
})
let dbclicked = function(){
  //emit('dbclick')
    card!.selected = !card!.selected 
    console.log(state.gameState.center_cards)
}
</script>


<template>
    <div class="card card-wrapper" 
    :class="{'selected':  props.selectable != false &&  card!.selected}"
    v-on:dblclick="dbclicked" :style="{'--size-o':props!.size}">
  <div class="card card-content" :style="{'background-color':bgcolor}">
      <template v-if="card!.number != 2">
        <div class="card-center">
  <h1 class=" prevent-select card-number card-number-m glow">{{card!.number == 0 ? '#' : card!.number}}</h1>
</div>
    </template>
      <template v-if="card!.number == 2">
        <div class="card-center">
  <h1 class="prevent-select card-number card-number-m glow">{{card!.number}}</h1>
  <div class="card-number-2 card-number-2-1" ></div>
  <div class="card-number-2 card-number-2-2" ></div>

  <div class="card-number-2 card-number-2-3" ></div>

  <div class="card-number-2 card-number-2-4" ></div>

</div>
    </template>

      <h1 class="prevent-select card-number card-number-h glow">{{card!.number == 0 ? '#' : card!.number}}</h1>
      <h1 class="prevent-select card-number card-number-b glow">{{card!.number == 0 ? '#' : card!.number}}</h1>
    </div>
  </div>
</template>

<style>
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
      font-size: calc(var(--size) * 0.25);
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
      font-size: calc(var(--size) * 0.6);
      position: absolute;
      transform: translate(-50%, -50%);
      left: calc(var(--size-c) / 2.2);
      top: calc(var(--size-c) / 2);
    }
    .card-number-2 {
      position: absolute;
      width: calc(var(--size) / 2);
      height: calc(var(--size) / 2);
      z-index: -1;
      transform-origin: top left;
      top: 50%;
      left: 50%;
      border-radius: 0 0 100% 0;
    }

    .card-number-2-1 {
      background-color: green;
    }
    .card-number-2-2 {
      transform: rotate(0.25turn);
      background-color: yellow;
    }
    .card-number-2-3 {
      transform: rotate(0.5turn);
      background-color: red;
    }
    .card-number-2-4 {
      background-color: blue;
      transform: rotate(0.75turn);
    }

    .card-number-h {
      position: absolute;
      left: calc(var(--size) / 20);
      top: calc(var(--size) * 1.6 / 40);
    }
    .card-number-b {
      position: absolute;
      right: calc(var(--size) / 10);
      bottom: calc(var(--size) * 1.6 / 30);
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
      transform: translate(calc(-51%), -50%);
      left: calc(var(--size) / 2);
      top: calc(var(--size) * 1.6 / 2);
      position: absolute;
      border-radius: 50%;
      height: var(--size-c);
      width: var(--size-c);
      background-color: white;
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
    .card-wrapper:hover {
      --size: calc(var(--size-o) * 1.01) !important;
      top: calc(var(--size-o) * -0.01);

      /*z-index: 10;*/
    }
    .card-wrapper.selected {
      --size: calc(var(--size-o) * 1.2) !important;
      top: calc(var(--size-o) * -0.2);
    }
</style>
