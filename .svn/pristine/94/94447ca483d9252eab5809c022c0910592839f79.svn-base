<template>
  <EmojiPicker :native="true" @select="onSelectEmoji" theme="light" :disableSkinTones="true" />
</template>

<script>
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
export default {
  name: "App",
  components: {
    EmojiPicker,
  },
  data() {
    return {};
  },
  methods: {
    onSelectEmoji(emoji) {
      this.$emit('EmojiSelect',emoji);
    },
  },
};
</script>

<style lang="scss" scoped>
.Test {
  background-color: rgba(231, 18, 18, 0.733);
}
</style>