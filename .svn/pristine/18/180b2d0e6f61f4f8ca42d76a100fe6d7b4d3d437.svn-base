<template>
  <div
    style="
      width: 100%;
      background-color: #bde9f2;
      position: relative;
      border-radius: 5px;
    "
    :class="{ disabled: !connected }"
  >
    <q-bar dense class="bg-teal text-white">
      <div ref="emojiPicker" class="emojiPicker">
        <EmojiPicker @EmojiSelect="EmojiPick"></EmojiPicker>
      </div>
      <q-btn-group flat>
        <q-btn
          square
          icon="sentiment_satisfied"
          @click="ShowEmoji"
          ref="btnShowEmoji"
        />
        <q-btn square icon="content_cut" />
        <q-btn square icon="drive_folder_upload" />
        <q-btn square icon="edit_location" />
      </q-btn-group>
      <q-space></q-space>
      <q-btn-group flat>
        <q-btn square icon="history" />
      </q-btn-group>
    </q-bar>
    <q-input
      v-model="message"
      type="textarea"
      standout="bg-teal-2 text-white"
      input-style="height: 50px;"
      :disable="!connected"
      @keyup.enter="sendMessage"
    >
    </q-input>
    <q-btn
      :disable="!connected"
      @click="sendMessage"
      size="20px"
      round
      dense
      flat
      icon="send"
      style="position: absolute; bottom: 2px; right: 15px"
    />
  </div>
</template>

<script>
import EmojiPicker from "./emojiPicker.vue";
export default {
  computed: {},
  components: { EmojiPicker },
  data() {
    return {
      messages: [],
      message: "",
      connected: false,
      EmojiVisible: false,
    };
  },
  beforeUnmount() {},
  mounted() {},
  methods: {
    EmojiPick(emoji) {
      this.message += emoji.i;
    },
    handleClickOutside(event) {
      if (
        this.$refs.emojiPicker &&
        !this.$refs.emojiPicker.contains(event.target) &&
        this.EmojiVisible
      ) {
        this.ShowEmoji();
      }
    },
    ShowEmoji() {
      if (!this.EmojiVisible) {
        this.$refs.emojiPicker.style.scale = "1";
        document.addEventListener("click", this.handleClickOutside);
      } else {
        this.$refs.emojiPicker.style.scale = "0";
        document.removeEventListener("click", this.handleClickOutside);
      }
      setTimeout(() => {
        this.EmojiVisible = !this.EmojiVisible;
      }, 100);
    },
    EnableSender(stt) {
      this.connected = stt;
    },
    sendMessage() {
      const msg = this.message.replace("\n", "");
      this.message = "";
      if (!msg) {
        this.$message({
          type: "error",
          message: "Cannot send blank message!",
        });
        return;
      }
      this.$emit("MessageSent", msg);
    },
  },
};
</script>

<style lang="scss" scoped>
.emojiPicker {
  position: absolute;
  bottom: 90px;
  scale: 0;
  transition: scale ease-in-out 0.3s;
}
</style>