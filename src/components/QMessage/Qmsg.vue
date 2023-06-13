<template>
  <q-chat-message
    :name="Name"
    :avatar="MemberInfo ? imageFromByte(MemberInfo.AVATAR) : noIMG"
    :stamp="GenStampTime(Stamp)"
    :sent="Sent"
    :text-color="TextColor"
    :bg-color="BGColor"
    :size="msg_size"
  >
    <div v-for="(msg, id) in Message" :key="id">
      {{ msg.text }}
      <img v-if="msg.icon" :src="imageFromByte(msg.icon)" class="my-emoticon" />
    </div>
  </q-chat-message>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default {
  name: "qmsg-1",
  props: {
    Name: {
      type: String,
      required: true,
    },
    MemberID: {
      type: Number,
      required: false,
    },
    Stamp: Date,
    Sent: Boolean,
    TextColor: String,
    BGColor: String,
    Message: Array,
  },
  mounted() {
    this.getMember(this.MemberID);
  },
  methods: {
    GenStampTime(time) {
      if (!time) {
        return "N/A";
      }
      const pastDate = new Date(time);
      const currentDate = new Date();
      const timeDiff = currentDate.getTime() - pastDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      if (daysDiff > 7) {
        return time;
      } else return dayjs(pastDate).fromNow();
    },
    imageFromByte(strBase64) {
      return `data:image/jpeg;base64,${strBase64}`;
    },
    async getMember(id) {
      const avt = sessionStorage.getItem(`avt${id}`);
      if (avt.length > 500) {
        this.MemberInfo = { AVATAR: avt };
        return;
      }
      await this.axios
        .get(`api/chatapp/MemberInfo?emp_id=${id}`)
        .then((res) => {
          this.MemberInfo = res.data;
          sessionStorage.setItem(
            `avt${this.MemberInfo.EMP_ID}`,
            this.MemberInfo.AVATAR
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      msg_size: 6,
      MemberInfo: undefined,
      noIMG: `${this.axios.defaults.baseURL}Images/noImg.png`,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-emoticon {
  vertical-align: middle;
  height: 2em;
  width: 2em;
}
</style>