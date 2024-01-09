<template>
  <div class="hello">
    <audio ref="player" @timeupdate="ShowCurrentTime" preload="auto">
      <source src="../../assets/audio/message_tone.mp3" type="audio/mpeg" />
    </audio>
    <q-scroll-area
      dark
      class="text-white rounded-borders"
      style="width: 100%; height: 370px"
      ref="hisScroll"
      @scroll="onHisScroll"
    >
      <div class="q-pa-md row justify-center">
        <div style="width: 100%;">
          <Qmsg
            v-for="(msg, id) in ChatHis"
            :key="id"
            :Name="msg.Sender"
            :MemberID="msg.ID"
            :BGColor="
              msg.ID == GetUser.EMP_ID
                ? MSGTextColor.Sender
                : MSGTextColor.Receiver
            "
            :Message="msg.message"
            :Sent="msg.ID == GetUser.EMP_ID"
            :Stamp="msg.SENT_TIME"
            TextColor="white"
          ></Qmsg>
        </div>
      </div>
    </q-scroll-area>
    <ctlBar
      v-show="ShowCtlBar"
      ref="msgCtlBar"
      @MessageSent="LocalSentMSG"
    ></ctlBar>
  </div>
</template>
  
  <script>
import { io } from "socket.io-client";
import { mapGetters } from "vuex";
import Qmsg from "./Qmsg.vue";
import ctlBar from "./MsgSender.vue";
export default {
  name: "HistoryBox",
  components: {
    Qmsg,
    ctlBar,
  },
  computed: {
    ...mapGetters({
      GetUser: "getUser",
    }),
  },
  props: {},
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  mounted() {
    this.RefreshData();
    this.InitSocket();
  },
  data() {
    return {
      url: "http://172.23.20.170:3001",
      socket: undefined,
      connected: false,
      HisVisible: false,
      GroupID: 0,
      testIMG: "",
      MSGTextColor: { Sender: "indigo-14", Receiver: "blue-grey-3" },
      members: undefined,
      ChatHis: [],
      lastMSG: undefined,
      lstGroupName: undefined,
      ShowCtlBar: false,
    };
  },
  methods: {
    UpdateGroupNameList(lstGroup) {
      this.lstGroupName = lstGroup;
      this.JoinSkRoom();
    },
    JoinSkRoom() {
      if (!this.lstGroupName || this.lstGroupName.length <= 0) {
        return;
      }
      return new Promise((resolve, reject) => {
        if (this.connected) {
          resolve(this.socket.emit("joinRoom", this.lstGroupName));
        } else {
          reject("Not connect to Server");
        }
      });
    },
    InitSocket() {
      this.socket = io(this.url);
      this.socket.on("connect", () => {
        console.log("Connected to server.");
        this.connected = true;
        this.JoinSkRoom();
        this.$refs.msgCtlBar.EnableSender(this.connected);
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnect from server");
        this.connected = false;
      });
      this.socket.on("msgFromServer", (data) => {
        console.log(data);
        if (data.msg.group_id == this.GroupID) {
          this.sendReadAllMsg(this.GroupID);
          const localMSG = {
            Sender: this.members.find((it) => it.EMP_ID == data.msg.sender)
              .EMP_NAME,
            ID: data.msg.sender,
            message: [{ text: data.msg.content }],
            SENT_TIME: new Date(),
          };
          this.MessageToUI(localMSG);
        }
        this.$emit("UpdateGroupInfo", {
          GROUP_ID: data.msg.group_id,
          LAST_MSG: data.msg.content,
          UNREAD_NUM: 1,
        });
        this.$refs.player.play();
      });
    },
    sendMessage(msg_sent) {
      this.socket.emit("sendMsg", {
        type: "ownMsg",
        msg: {
          content: msg_sent,
          type: "text",
          sender: this.GetUser.EMP_ID,
          receiver: 0,
          group_id: this.GroupID,
          media_id: 0,
        },
      });
    },
    sendReadAllMsg(grp_id) {
      this.socket.emit("readAllMSG", {
        type: "ownMsg",
        msg: { MES_ID: 0, EMP_ID: this.GetUser.EMP_ID, GROUP_ID: grp_id },
      });
    },
    MessageToUI(localMSG) {
      if (this.lastMSG && this.lastMSG.ID == localMSG.ID) {
        localMSG.message.forEach((el) => {
          this.ChatHis[this.ChatHis.length - 1].message.push(el);
          this.ChatHis[this.ChatHis.length - 1].SENT_TIME = new Date();
        });
      } else {
        this.ChatHis.push(localMSG);
      }
      this.lastMSG = localMSG;
      this.ScrollHis();
    },
    LocalSentMSG(msg) {
      if (this.GroupID <= 0) return;
      const localMSG = {
        Sender: this.GetUser.Name,
        ID: this.GetUser.EMP_ID,
        message: [{ text: msg }],
        SENT_TIME: new Date(),
      };
      this.MessageToUI(localMSG);
      this.sendMessage(msg);
      this.$emit("UpdateLastMSG", { msg: msg, group_id: this.GroupID });
    },
    RefreshData(group_id, unreadNum) {
      if (group_id > 0 && group_id != this.GroupID) {
        this.GroupID = group_id;
        this.GetMemberInfor();
        this.GetChatHistory();
        if (!this.ShowCtlBar) {
          this.ShowCtlBar = true;
        }
        if (unreadNum > 0) this.sendReadAllMsg(group_id);
      }
    },
    ShowAvatar(member) {
      if (this.members)
        this.members.forEach((item) => {
          if (item.EMP_ID == member) {
            return { img: this.imageFromByte(item.AVATAR) };
          }
        });
    },
    imageFromByte(strBase64) {
      return `data:image/jpeg;base64,${strBase64}`;
    },
    async EmpAvatar(emp_id) {
      const response = this.axios.get(
        `api/chatapp/MemberInfo?emp_id=${emp_id}`
      );
      return new Promise((resol, ej) => {
        response
          .then((res) => {
            resol(res.data.AVATAR);
          })
          .catch((err) => {
            this.$message({
              type: "error",
              message: err,
            });
            ej("Get emp avatar error!");
          });
      });
    },
    async GetMemberInfor() {
      await this.axios
        .get(
          `api/chatapp/GetGroupMemberInfo?groupID=${this.GroupID}&mem_avt=False`
        )
        .then((res) => {
          this.members = res.data;
          this.members.forEach(async (el) => {
            var key = `avt${el.EMP_ID}`;
            if (
              !sessionStorage.getItem(key) ||
              sessionStorage.getItem(key).length < 500
            ) {
              const avt = await this.EmpAvatar(el.EMP_ID);
              sessionStorage.setItem(key, avt);
            }
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    async GetChatHistory() {
      this.ChatHis = [];
      await this.axios
        .get(`api/chatapp/GetHistory?groupID=${this.GroupID}&StartPoint=0`)
        .then((res) => {
          var sentEMP = res.data[0].SENDER_ID;
          var msg = undefined;
          res.data.forEach((item) => {
            if (!msg) {
              msg = {
                Sender: item.SENDER,
                ID: item.SENDER_ID,
                message: [{ text: item.MES_CONTENT }],
                SENT_TIME: item.SENT_TIME,
              };
            } else {
              if (sentEMP == item.SENDER_ID) {
                msg.message.push({ text: item.MES_CONTENT });
                msg.SENT_TIME = item.SENT_TIME;
              } else {
                this.ChatHis.push(msg);
                msg = {
                  Sender: item.SENDER,
                  ID: item.SENDER_ID,
                  message: [{ text: item.MES_CONTENT }],
                  SENT_TIME: item.SENT_TIME,
                };
              }
            }
            sentEMP = item.SENDER_ID;
          });
          this.ChatHis.push(msg);
          this.HisVisible = false;
          this.ScrollHis(1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ScrollHis(time2scroll = 300) {
      setTimeout(() => {
        this.$refs.hisScroll.setScrollPercentage("vertical", 1, time2scroll);
      }, 100);
    },
  },
  onHisScroll({ verticalPosition }) {
    console.log(verticalPosition);
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="scss" scoped>
.hello {
  margin: {
    left: 5px;
    right: 5px;
  }
}
</style>
  