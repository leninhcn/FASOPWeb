<template>
  <div class="classBo">
    <div v-if="!Owner" class="container">
      <div class="avatar shadow-8">
        <img :src="avatar" alt="" />
      </div>
      <span class="Sender">{{ sender }}</span>
      <div v-if="msgType === 'text'">
        <div v-for="(msg, id) in messages" :key="id">
          <div
            class="msgText shadow-8"
            :class="{
              lastMSG: id == messages.length - 1,
            }"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>
      <div class="msgImg" v-if="msgType === 'img'">
        <img :src="avatar" alt="" />
      </div>
      <span class="Stamp">{{ stamp }}</span>
    </div>

    <div v-if="Owner" class="OwnerContainer">
      <div class="avatar shadow-8">
        <img :src="avatar" alt="" />
      </div>
      <span class="Sender">{{ sender }}</span>
      <div v-if="msgType === 'text'">
        <div v-for="(msg, id) in messages" :key="id">
          <div
            class="msgText shadow-8"
            :class="{
              lastMSG: id == messages.length - 1,
            }"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>
      <div class="msgImg" v-if="msgType === 'img'">
        <img :src="avatar" alt="" />
      </div>
      <span class="Stamp">{{ stamp }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: false,
      default: () => [
        { text: "m1" },
        { text: "m2" },
        {
          text: "m3aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
      ],
    },
    sender: {
      type: String,
      required: false,
      default: "CHAN QUA NHI",
    },
    msgType: {
      type: String,
      required: false,
      default: "text",
    },
    Owner: {
      type: Boolean,
      required: false,
      default: false,
    },
    stamp: {
      type: String,
      required: false,
      default: "5 minutes ago",
    },
    avatar: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      noIMG: `${this.axios.defaults.baseURL}Images/noIMG.png`,
    };
  },
};
</script>

<style lang="scss" scoped>
.classBo {
  margin: {
    top: 30px;
  }
}
.container {
  position: relative;
  text-align: left;
  .msgImg {
    width: 150px;
    height: 150px;
    margin: {
      left: 40px;
    }
    img {
      width: inherit;
      height: inherit;
    }
  }

  .avatar {
    position: absolute;
    width: 40px;
    height: 40px;
    bottom: 0;
    img {
      width: inherit;
      height: inherit;
      border-radius: 50%;
    }
  }
  .Sender {
    color: #809c00;
    margin: {
      left: 45px;
    }
  }
  $msg-bg-color: #b0bec5;
  .msgText {
    background-color: $msg-bg-color;
    color: white;
    width: fit-content;
    position: relative;
    border-radius: 3px 3px 3px 0;
    word-wrap: break-word;
    max-width: 550px;
    min-width: 20px;
    text-align: left;
    padding: {
      left: 5px;
      right: 5px;
      top: 5px;
      bottom: 5px;
    }
    margin: {
      left: 45px;
      bottom: 5px;
      right: 0;
    }
  }

  .lastMSG {
    padding: {
      top: 15px;
      bottom: 15px;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: -10px;
      width: 0;
      height: 0;
      border-bottom: 8px solid $msg-bg-color;
      border-left: 15px solid transparent;
    }
  }
  .Stamp {
    float: left;
    margin-left: 45px;
    font-size: x-small;
  }
}
.OwnerContainer {
  position: relative;
  display: flex;
  justify-content: flex-end;
  .msgImg {
    width: 150px;
    height: 150px;
    margin: {
      right: 45px;
    }
    img {
      width: inherit;
      height: inherit;
    }
  }

  .avatar {
    position: absolute;
    width: 40px;
    height: 40px;
    bottom: 0;
    right: 0;
    img {
      width: inherit;
      height: inherit;
      border-radius: 50%;
    }
  }
  .Sender {
    position: absolute;
    color: #ebff38;
    top: -20px;
    right: 48px;
  }
  $msg-bg-color: rgb(17, 0, 255);
  .msgText {
    background-color: $msg-bg-color;
    color: white;
    width: fit-content;
    position: relative;
    border-radius: 3px 3px 0 3px;
    max-width: 550px;
    min-width: 20px;
    word-wrap: break-word;
    text-align: left;
    padding: {
      left: 5px;
      right: 5px;
      top: 5px;
      bottom: 5px;
    }
    margin: {
      left: auto;
      right: 45px;
      top: 3px;
    }
  }
  .lastMSG {
    padding: {
      top: 15px;
      bottom: 15px;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: -10px;
      width: 0;
      height: 0;
      border-bottom: 8px solid $msg-bg-color;
      border-right: 15px solid transparent;
    }
  }
  .Stamp {
    position: absolute;
    font-size: x-small;
    bottom: -15px;
    right: 45px;
  }
}
</style>