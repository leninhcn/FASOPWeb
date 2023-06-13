<template>
  <div v-for="message in formattedMessages" :key="message.timestamp">
    {{ message.content }} - {{ message.timestamp }}
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default {
  mounted() {
    //this.createScrollContent();
  },
  computed: {
    formattedMessages() {
      return this.messages.map((message) => ({
        content: message.content,
        timestamp: dayjs(message.timestamp).fromNow(),
      }));
    },
  },
  data() {
    return {
      messages: [
        { content: "Hello", timestamp: 1653221461000 }, // Ví dụ tin nhắn với timestamp
        { content: "Hi", timestamp: 1653135061000 },
      ],
    };
  },
  methods: {
    createScrollContent() {
      const scrollContent = this.$refs.scrollContent;

      // Tạo nội dung của q-scroll-area bằng code
      for (let i = 0; i < 100; i++) {
        const item = document.createElement("div");
        item.textContent = `Item ${i + 1}`;
        scrollContent.appendChild(item);
      }
    },
  },
};
</script>

<style>
.reverse-scroll-area {
  height: 300px;
  overflow-y: auto;
  scroll-behavior: smooth;
  transform: scaleY(-1);
}

.scroll-content {
  transform: scaleY(-1);
}
</style>
