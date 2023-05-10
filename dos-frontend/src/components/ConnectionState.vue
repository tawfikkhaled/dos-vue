
<template>
    <p>State: {{ connected }}</p>
  </template>
  
  <script lang="ts">
  import { state } from "../service/game.socket";
  
  export default {
    name: "ConnectionState",
  
    computed: {
      connected() {
        return state.connected;
      }
    }
  }
  </script>