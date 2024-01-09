<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh Lpr lff"
      container
      style="height: 500px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>
            <div @dblclick="GroupEditing = true" v-if="!GroupEditing">
              {{ GroupName }}
            </div>
            <div v-if="GroupEditing">
              <q-input
                v-model="GroupName"
                dense
                autofocus
                counter
                @keyup.enter="GroupNameEdit"
              />
            </div>
          </q-toolbar-title>
          <q-btn
            flat
            icon="person_add"
            round
            dense
            :disable="CurrentGroupID <= 0"
            @click="
              () => {
                this.addUser = this.CurrentGroupID > 0;
                this.NewChat = false;
              }
            "
          ></q-btn>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-btn
            flat
            icon="cancel"
            round
            dense
            @click="$emit('CloseChatBox')"
          />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <div>
            <q-splitter v-model="splitterModel" style="height: 350px">
              <template v-slot:before>
                <q-tabs
                  v-model="tab"
                  indicator-color="transparent"
                  active-color="lime-11"
                  class="bg-teal text-grey-5 shadow-2"
                  vertical
                  style="height: 100%"
                >
                  <q-tab name="chats" icon="chat">
                    <q-badge v-if="TotalUnread > 0" color="red" floating>{{
                      TotalUnread
                    }}</q-badge>
                  </q-tab>
                  <q-tab name="friends" icon="group" />
                  <q-tab name="others" icon="favorite" />
                </q-tabs>
              </template>

              <template v-slot:after>
                <q-tab-panels
                  v-model="tab"
                  animated
                  swipeable
                  vertical
                  transition-prev="jump-up"
                  transition-next="jump-up"
                >
                  <q-tab-panel name="chats">
                    <q-list
                      style="margin-left: -15px"
                      v-for="(grp, idx) in GroupList"
                      :key="idx"
                    >
                      <q-menu
                        style="z-index: 9999"
                        touch-position
                        context-menu
                        ref="myMenu"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-list style="min-width: 100px">
                          <q-item
                            clickable
                            v-close-popup
                            @click="
                              () => {
                                this.addUser = true;
                                this.NewChat = true;
                              }
                            "
                          >
                            <q-item-section avatar>
                              <q-icon color="indigo-14" name="add_comment" />
                            </q-item-section>
                            <q-item-section style="margin-left: -25px"
                              >New Chat</q-item-section
                            >
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section avatar>
                              <q-icon color="indigo-14" name="fact_check" />
                            </q-item-section>
                            <q-item-section style="margin-left: -25px"
                              >Group Manage</q-item-section
                            >
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section avatar>
                              <q-icon color="red-13" name="clear_all" />
                            </q-item-section>
                            <q-item-section style="margin-left: -25px"
                              >Clear History</q-item-section
                            >
                          </q-item>
                          <q-item clickable v-close-popup @click="GroupDelete">
                            <q-item-section avatar>
                              <q-icon color="red-13" name="delete" />
                            </q-item-section>
                            <q-item-section style="margin-left: -25px"
                              >Delete Group</q-item-section
                            >
                          </q-item>
                        </q-list>
                      </q-menu>
                      <q-item
                        style="margin-left: -15px; margin-right: -15px"
                        :active="grp.GROUP_ID == activeID"
                        clickable
                        v-ripple
                        active-class="GroupActiveClass"
                        @click="GroupClick(grp.GROUP_ID, grp.GROUP_NAME)"
                        @contextmenu="GroupRightClick(grp)"
                      >
                        <q-item-section avatar>
                          <q-avatar>
                            <img :src="GroupAvatarList[idx]" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section style="margin: -15px">
                          <Group
                            :GroupName="grp.GROUP_NAME"
                            :LastMsg="GroupList[idx].INFO.LAST_MSG"
                            :UnreadNum="GroupList[idx].INFO.UNREAD_NUM"
                            :LastTime="
                              GenStampTime(GroupList[idx].INFO.LAST_TIME)
                            "
                          >
                          </Group>
                        </q-item-section>
                      </q-item>
                      <q-separator
                        v-show="!(grp.GROUP_ID == activeID)"
                        color="grey-4"
                      />
                    </q-list>
                  </q-tab-panel>

                  <q-tab-panel name="friends" style="padding: 0">
                    <FriendsList></FriendsList>
                  </q-tab-panel>

                  <q-tab-panel name="others">
                    <div class="text-h4 q-mb-md">Movies</div>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quis praesentium cumque magnam odio iure quidem, quod
                      illum numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero. Lorem
                      ipsum dolor sit, amet consectetur adipisicing elit. Quis
                      praesentium cumque magnam odio iure quidem, quod illum
                      numquam possimus obcaecati commodi minima assumenda
                      consectetur culpa fuga nulla ullam. In, libero.
                    </p>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </div>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="../../assets/userBGR.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm" style="cursor: pointer">
              <img :src="imageFromByte(Avatar)" />
            </q-avatar>
            <div class="text-weight-bold">{{ GetUser.Name }}</div>
            <div>{{ GetUser.Email }}</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container class="custom-page-container">
        <q-page>
          <His
            ref="MyHis"
            @UpdateGroupInfo="UpdateGroupFromHis"
            @UpdateLastMSG="LastMSGUpdate"
          ></His>
          <div
            v-if="addUser"
            class="fit absolute-center"
            style="background-color: rgba(0, 255, 255, 0.596)"
          >
            <div class="myDialog absolute-center">
              <q-input
                v-if="NewChat"
                clearable
                v-model="NewGroupName"
                label="Group Name"
                input-style="text-align: center; font-size: 2em;"
                style="margin-left: 10px; margin-right: 10px"
              ></q-input>
              <q-select
                v-model="selectedUser"
                clearable
                use-input
                options-selected-class="text-deep-orange"
                label="Select Emp"
                :options="lstMembers"
                @filter="filterFn"
                @filter-abort="abortFilterFn"
                style="margin: 5px"
                multiple
                counter
                :popup-content-style="'z-index: 999;'"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-icon :name="scope.opt.icon" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                      <q-item-label caption>{{
                        scope.opt.description
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <div class="absolute-bottom">
                <q-btn
                  icon="done"
                  color="primary"
                  style="width: 150px; margin: 5px"
                  @click="AddGroupUser"
                  >OK</q-btn
                >
                <q-btn
                  icon="cancel"
                  color="red"
                  style="width: 150px; margin: 5px"
                  @click="addUser = false"
                  >Cancel</q-btn
                >
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
  
  <script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { createCanvas, loadImage } from "canvas";
import { mapGetters } from "vuex";
import His from "./HistoryBox.vue";
import Group from "./GroupInfo.vue";
import FriendsList from "./FriendList.vue";
export default {
  components: {
    His,
    Group,
    FriendsList,
  },
  computed: {
    ...mapGetters({
      GetUser: "getUser",
    }),
  },
  mounted() {
    this.loadImageAsBase64("Images/noImg.png");
    setTimeout(() => {
      this.Avatar = sessionStorage.getItem(`avt${this.GetUser.EMP_ID}`);
      this.GetChatGroupList();
      this.GetAllEMP();
    }, 500);
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
    LastMSGUpdate(msgInfo) {
      const lastMSG = this.GroupList.find(
        (grp) => grp.GROUP_ID == msgInfo.group_id
      );
      lastMSG.INFO.LAST_TIME = new Date();
      lastMSG.INFO.LAST_MSG = msgInfo.msg;
    },
    async GroupNameEdit() {
      await this.axios
        .post("api/chatapp/GroupNameEdit", {
          GROUP_NAME: this.GroupName,
          GROUP_ID: this.CurrentGroupID,
        })
        .then((res) => {
          this.$message({
            showClose: true,
            type: "success",
            message: res.data,
          });
          this.GroupList.find(
            (it) => it.GROUP_ID == this.CurrentGroupID
          ).GROUP_NAME = this.GroupName;
          // console.log(gidx);
          // if (gidx > -1) this.GroupList[gidx].GROUP_NAME = this.GroupName;
          this.GroupEditing = false;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            type: "error",
            message: err.response.data,
          });
        });
    },
    UpdateGroupFromHis(grp_info) {
      this.GroupList.forEach((el, idx) => {
        if (el.GROUP_ID == grp_info.GROUP_ID) {
          this.GroupList[idx].INFO.LAST_MSG = grp_info.LAST_MSG;
          if (this.CurrentGroupID != grp_info.GROUP_ID) {
            this.GroupList[idx].INFO.UNREAD_NUM += grp_info.UNREAD_NUM;
            this.TotalUnread += grp_info.UNREAD_NUM;
          }
        }
      });
    },
    GroupClick(grp_id, grp_name) {
      this.CurrentGroupID = grp_id;
      const unreadNum = this.GroupList.find((it) => it.GROUP_ID == grp_id).INFO
        .UNREAD_NUM;
      this.$refs.MyHis.RefreshData(grp_id, unreadNum);
      this.$refs.MyHis.lastMSG = {
        ID: this.GroupList.find((it) => it.GROUP_ID == grp_id).INFO.SENDER_ID,
      };
      this.activeID = grp_id;
      this.GroupName = grp_name;
      this.addUser = false;
      this.GroupList.forEach((el, idx) => {
        if (el.GROUP_ID == grp_id) {
          this.TotalUnread -= this.GroupList[idx].INFO.UNREAD_NUM;
          this.GroupList[idx].INFO.UNREAD_NUM = 0;
        }
      });
    },
    GroupRightClick(grp) {
      this.GroupActiveMenu = grp;
    },
    GetAllEMP() {
      this.axios
        .get(`api/chatapp/EmpSearch?emp=all`)
        .then((res) => {
          res.data.forEach((el) => {
            this.stringOptions.push({
              label: el.EMP_NAME,
              value: el.EMP_ID,
              description: el.EMP_NO,
              icon: "contact_mail",
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    abortFilterFn() {
      console.log("delayed filter aborted");
    },
    async filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.lstMembers = this.stringOptions;
        } else {
          const needle = val.toLowerCase();
          this.lstMembers = this.stringOptions.filter(
            (v) =>
              v.label.toLowerCase().indexOf(needle) > -1 ||
              v.description.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    async loadImageAsBase64(imagePath) {
      try {
        const response = await this.axios.get(imagePath, {
          responseType: "blob",
        });
        const reader = new FileReader();
        reader.readAsDataURL(response.data);

        reader.onloadend = () => {
          this.NoImageData = reader.result.replace(
            "data:image/png;base64,",
            ""
          );
        };
      } catch (error) {
        console.error(error);
      }
    },
    async GroupAvatar(group, idx) {
      const lsrImg = [];
      group.INFO.EMP_AVATAR.forEach(async (el, id) => {
        if (id <= 3) {
          if (group.INFO.EMP_AVATAR.length == 2) {
            if (el.EMP_ID != this.GetUser.EMP_ID) {
              lsrImg.push(el.AVATAR);
              return;
            }
          } else {
            if (el.AVATAR) lsrImg.push(el.AVATAR);
            else {
              lsrImg.push(this.NoImageData);
            }
          }
        } else {
          return;
        }
      });
      const mergedImageUrl = await this.ImageMerging(lsrImg);
      if (this.GroupAvatarList[idx]) {
        this.GroupAvatarList[idx] = mergedImageUrl;
      } else {
        this.GroupAvatarList.push(mergedImageUrl);
      }
      this.GroupList[idx].INFO.EMP_AVATAR.AVATAR = undefined;
    },
    async ImageMerging(imgList) {
      if (!imgList || imgList.length > 4) {
        return "#";
      }
      if (imgList.length <= 2) {
        return `data:image/png;base64,${imgList[0]}`;
      }
      const canvasWidth = 1000;
      const canvasHeight = 1000;
      let canvas = createCanvas(500, 500);
      let ctx = canvas.getContext("2d");
      var lstSyncIMG = [];

      return new Promise((resolve, reject) => {
        const promises = [];

        imgList.forEach((task) => {
          const promise = new Promise((innerResolve, innerReject) => {
            try {
              loadImage(`data:image/png;base64,${task}`)
                .then((res) => {
                  ctx.drawImage(res, 0, 0, 500, 500);
                  loadImage(canvas.toDataURL("image/png"))
                    .then((img) => {
                      lstSyncIMG.push(img);
                      innerResolve(img);
                    })
                    .catch((er) => innerReject(er));
                })
                .catch((err) => innerReject(err));
            } catch (error) {
              innerReject(error);
            }
          });

          promises.push(promise);
        });

        Promise.all(promises)
          .then(() => {
            canvas = createCanvas(canvasWidth, canvasHeight);
            ctx = canvas.getContext("2d");

            lstSyncIMG.forEach((el, idx) => {
              switch (idx) {
                case 0:
                  ctx.drawImage(el, 0, 0, 500, 500);
                  break;
                case 1:
                  ctx.drawImage(el, 500, 0, 500, 500);
                  break;
                case 2:
                  ctx.drawImage(el, 0, 500, 500, 500);
                  break;
                case 3:
                  ctx.drawImage(el, 500, 500, 500, 500);
                  break;
                default:
                  break;
              }
            });

            resolve(canvas.toDataURL("image/png"));
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetChatGroupList() {
      this.axios
        .get(`api/chatapp/GetEmpAllGroup?emp_id=${this.GetUser.EMP_ID}`)
        .then((res) => {
          this.TotalUnread = 0;
          this.GroupList = res.data;
          const lstID = [];
          this.GroupList.forEach((element, idx) => {
            this.TotalUnread += element.INFO.UNREAD_NUM;
            lstID.push(element.GROUP_ID);
            this.GroupAvatar(element, idx);
          });
          this.$refs.MyHis.UpdateGroupNameList(lstID);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    imageFromByte(strBase64) {
      return `data:image/jpeg;base64,${strBase64}`;
    },
    AddNewGroup() {
      if (this.selectedUser && this.selectedUser.length > 0) {
        const grp_users = {
          GROUP_NAME:
            this.selectedUser.length === 1
              ? this.selectedUser[0].label
              : this.NewGroupName,
          ADMIN: this.GetUser.EMP_ID,
          EMP_LIST: [],
        };
        grp_users.EMP_LIST.push(this.GetUser.EMP_ID);
        this.selectedUser.forEach((el) => {
          grp_users.EMP_LIST.push(el.value);
        });

        this.axios
          .post("api/chatapp/AddNewGroup", grp_users)
          .then((res) => {
            console.log(res.data);
            this.GroupList.push(res.data[0]);
            this.NewChat = false;
            this.addUser = false;
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              type: "error",
              message: err.response.data,
            });
          });
      }
    },
    AddGroupUser() {
      if (this.NewChat) {
        this.AddNewGroup();
        return;
      }
      if (this.CurrentGroupID > 0) {
        if (this.selectedUser && this.selectedUser.length > 0) {
          const grp_users = {
            REMOVE_EMP: false,
            GROUP_ID: this.CurrentGroupID,
            EMP_LIST: [],
          };
          this.selectedUser.forEach((el) => {
            grp_users.EMP_LIST.push(el.value);
          });
          console.log(grp_users);
          this.axios
            .post("api/chatapp/GroupEmpEdit", grp_users)
            .then((res) => {
              this.$message({
                showClose: true,
                type: "success",
                message: res.data,
              });
              this.addUser = false;
            })
            .catch((err) => {
              console.log(err);
            });
        } else
          this.$message({
            showClose: true,
            type: "error",
            message: "EMP list cannot be empty!",
          });
      }
    },
    GroupDelete() {
      this.$messageBox
        .confirm(
          `Delete this group: (${this.GroupActiveMenu.GROUP_NAME})`,
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        )
        .then(() => {
          this.axios
            .post(
              `api/chatapp/DeleteGroup?group_id=${this.GroupActiveMenu.GROUP_ID}`
            )
            .then((res) => {
              let index = this.GroupList.findIndex(
                (item) => item.GROUP_ID === this.GroupActiveMenu.GROUP_ID
              );
              if (index !== -1) {
                this.GroupList.splice(index, 1);
              }
              this.$message({
                type: "success",
                message: res.data,
              });
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.response.data,
              });
            });
        });
    },
  },
  data() {
    return {
      NewGroupName: "NoName",
      GroupEditing: false,
      NoImageData: undefined,
      GroupActiveMenu: undefined,
      CurrentGroupID: 0,
      addUser: false,
      NewChat: false,
      selectedUser: undefined,
      lstMembers: [],
      stringOptions: [],
      tab: "chats",
      splitterModel: 20,
      Avatar: "",
      drawer: false,
      activeID: 0,
      GroupName: "",
      GroupList: [
        {
          GROUP_ID: 0,
          GROUP_NAME: "Default",
          INFO: {
            SENDER_ID: 0,
            LAST_MSG: "None",
            LAST_TIME: undefined,
            UNREAD_NUM: 0,
            EMP_AVATAR: undefined,
          },
        },
      ],
      GroupAvatarList: [],
      TotalUnread: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
.selectEMPStyle {
  z-index: 999;
  max-height: 300px;
}
.myDialog {
  background-color: rgb(255, 255, 255);
  width: 80%;
  height: 50%;
  border-radius: 5px;
}
.custom-page-container {
  background-color: #1f144b;
}
.GroupActiveClass {
  background-color: aquamarine;
}
</style>
  