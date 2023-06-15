<template>
  <div>
    <MyMSG
      :messages="Message"
      msgType="text"
      :Owner="Sent"
      :sender="Name"
      :stamp="GenStampTime(Stamp)"
      :avatar="MemberInfo ? imageFromByte(MemberInfo.AVATAR) : noIMG"
    ></MyMSG>
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import MyMSG from "./MyMessage.vue";
export default {
  name: "qmsg-1",
  components: {
    MyMSG,
  },
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
.container {
  margin: {
    top: 35px;
  };
}
.my-emoticon {
  vertical-align: middle;
  height: 2em;
  width: 2em;
}
</style>