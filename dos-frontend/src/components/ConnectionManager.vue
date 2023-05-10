<template>
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
  </template>
  
  <script lang="ts">
  import { socket } from "../service/game.socket";
  
  export default {
    name: "ConnectionManager",
  
    methods: {
      connect() {
        socket.connect();
      },
      disconnect() {
        socket.disconnect();
      }
    }
  }
  </script>