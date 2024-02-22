<template>
  <div>
    <h2>WebSocket Example</h2>
    <div v-if="connected">
      <h3>Connected to WebSocket server at {{ url }}</h3>
      <form @submit.prevent="sendMessage">
        <label for="message">Message:</label>
        <input type="text" v-model="message" required />
        <button type="submit">Send</button>
      </form>
      <ul>
        <li v-for="(msg, id) in messages" :key="id">{{ msg }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Connecting to WebSocket server at {{ url }}...</p>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
export default {
  mounted() {
    this.socket = io(this.url);
    this.socket.on("connect", () => {
      this.connected = true;
    });

    this.socket.on("disconnect", () => {
      this.connected = false;
    });

    this.socket.on("msgFromServer", (data) => {
      this.messages.push(`${data.sender}: ${data.content}`);
      console.log(this.message);
    });
  },
  data() {
    return {
      url: "http://localhost:3001",
      socket: undefined,
      connected: false,
      messages: [],
      message: "",
    };
  },
  methods: {
    sendMessage() {
      console.log(this.message);
      this.socket.emit("sendMsg", {
        type: "ownMsg",
        msg: {
          content: this.message,
          type: "text",
          sender: 123333,
          receiver: 4545454,
          group_id: 0,
          media_id: 0,
        },
      });
      this.message = "";
    },
  },
};
</script>

<style>
</style>