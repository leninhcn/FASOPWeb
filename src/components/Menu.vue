<template>
  <div class="home_container">
    <el-container class="home_container">
      <el-header>
        <div>
          <img
            src="../assets/logo.png"
            style="cursor: pointer"
            alt=""
            @click="$router.push('/wellcome')"
          />
          <span @click="$router.push('/wellcome')" style="cursor: pointer"
            >CPBG MES-VN</span
          >
        </div>
        <div>
          <nav>
            <el-dropdown>
              <span
                style="font-size: 1.3em; margin-top: 5px; cursor: pointer"
                class="el-dropdown-link"
              >
                {{ UserName }}
                <ArrowDown
                  style="width: 1em; height: 1em; margin-bottom: -3px"
                />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="#"
                      ><i class="icofont-ui-password"></i> Change
                      Password</router-link
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <a href="#" @click.prevent="logout"
                      ><i class="icofont-logout"></i> Logout</a
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </nav>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="!mColap ? '64px' : '200px'" style="min-height: 93vh;">
          <div class="toggle-button" @click="toggleCollapse" id="toggle-button">
            <Expand v-if="!mColap" style="width: 2em; height: 2em" />
            <Fold v-if="mColap" style="width: 2em; height: 2em" />
          </div>
          <el-menu
            class="elmenu"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            :unique-opened="true"
            :collapse="!mColap"
            :collapse-transition="false"
            :router="true"
            :default-active="activePath"
          >
            <el-sub-menu
              v-for="(item, id) in Menu.filter(
                (item) => item.TYPE === 'SUB_MENU'
              )"
              :key="id"
              :index="id"
              :disabled="
                !item.DISPLAY_STATUS.includes('ENABLE') ||
                GetUser.AdminRole < item.ROLE_REQUIRE
              "
            >
              <template #title>
                <el-icon>
                  <Folder />
                </el-icon>
                <span>{{ item.NAME }}</span>
              </template>
              <el-menu-item-group
                v-for="(itg, idx) in item.CHILDREN"
                :key="idx"
                :title="itg.NAME"
              >
                <el-menu-item
                  v-for="(it, idxt) in itg.CHILDREN"
                  :key="idxt"
                  :index="it.LINK_TO"
                  :disabled="
                    !it.DISPLAY_STATUS.includes('ENABLE') ||
                    GetUser.AdminRole < it.ROLE_REQUIRE
                  "
                >
                  <el-icon>
                    <component :is="GetIcon(idxt)" />
                  </el-icon>
                  {{ it.NAME }}
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item
              v-for="(item, id) in Menu.filter(
                (item) => item.TYPE === 'MENU_ITEM'
              )"
              :key="id"
              :index="item.LINK_TO"
              :disabled="!item.DISPLAY_STATUS.includes('ENABLE')"
            >
              <i
                class="icofont-code"
                style="margin-left: 3px; margin-right: 6px"
              ></i>
              <span>{{ item.NAME }}</span>
            </el-menu-item>
            <el-sub-menu :disabled="GetUser.AdminRole <= 8" index="2">
              <template #title>
                <i
                  style="margin-left: 3px; margin-right: 6px"
                  class="icofont-ui-settings"
                ></i>
                <span>Maintenance Area</span>
              </template>
              <el-menu-item-group title="Menu">
                <el-menu-item index="/menumana"
                  ><el-icon> <Menu /> </el-icon>Menu Management</el-menu-item
                >
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="/about">
              <i
                class="icofont-code"
                style="margin-left: 3px; margin-right: 6px"
              ></i>
              <span>Development Team</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
          <ChatBox></ChatBox>
        </el-main>
        <div v-if="GetUser.AdminRole >= 9">
          <div class="MediaPopup" ref="MediaPopup">
            <MyPlayer
              @ShowList="ShowPlayList"
              :lstCollapse="PlayListCollap"
              :trackList="CurrentTrackList"
              @CurrentTrackUpdate="CurrentTrackUpdate"
              ref="MyPlayer"
            ></MyPlayer>
          </div>
          <div class="PlayList" ref="PlayList">
            <q-btn
              :icon="showListIcon"
              square
              color="purple-5"
              @click="ShowPlayList"
              glossy
              text-color="black"
              class="absolute-left"
              style="width: 35px; padding: 0"
            >
            </q-btn>
            <PlayList
              @PlayListUpdate="PlayListUpdate"
              ref="MyPlaylist"
              @TrackToPlay="TrackToPlay"
            ></PlayList>
          </div>
          <q-btn
            class="fixed-bottom-right q-ma-md"
            fab
            color="purple-7"
            size="lg"
            icon="radio"
            @click="ShowPlayer"
            style="right: 60px !important; z-index: 997;"
          ></q-btn>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
  
<script>
import MyPlayer from "../components/MediaArea/MediaPlayer.vue";
import PlayList from "../components/MediaArea/PlayList.vue";
import ChatBox from "../components/QMessage/ChatBox.vue";
import { mapGetters, mapActions } from "vuex";
import {
  Files,
  Tickets,
  Collection,
  Postcard,
  SetUp,
  DocumentChecked,
  DataBoard,
  DataAnalysis,
} from "@element-plus/icons-vue";
export default {
  components: {
    ChatBox,
    MyPlayer,
    PlayList,
  },
  computed: {
    ...mapGetters({
      GetUser: "getUser",
    }),
  },
  mounted() {
    if (this.GetUser) this.UserName = this.GetUser.Name;
    this.getMenu();
  },
  name: "menu-bar",
  data() {
    return {
      CurrentTrackList: [],
      PlayListCollap: true,
      showListIcon: "arrow_back_ios",
      media_vis: true,
      mColap: true,
      UserName: "",
      Menu: [],
      icons: [
        Files,
        Tickets,
        Collection,
        Postcard,
        SetUp,
        DocumentChecked,
        DataBoard,
        DataAnalysis,
      ],
    };
  },
  methods: {
    ...mapActions(["Logout"]),
    TrackToPlay(id) {
      this.$refs.MyPlayer.PlayFromList(id);
    },
    CurrentTrackUpdate(cTrack) {
      this.$refs.MyPlaylist.UpdatePlayingTrack(cTrack.DB_ID);
    },
    PlayListUpdate(lstTrack) {
      this.CurrentTrackList = lstTrack;
    },
    ShowPlayList() {
      if (this.$refs.PlayList.style.right == "0px") {
        this.$refs.PlayList.style.right = "-530px";
        this.showListIcon = "arrow_back_ios";
        this.PlayListCollap = true;
      } else {
        this.$refs.PlayList.style.right = "0";
        this.showListIcon = "arrow_forward_ios";
        this.PlayListCollap = false;
      }
    },
    ShowPlayer() {
      if (this.$refs.MediaPopup.style.bottom == "10px") {
        this.$refs.MediaPopup.style.bottom = "-200px";
        this.$refs.PlayList.style.right = "-550px";
        this.showListIcon = "arrow_back_ios";
        this.PlayListCollap = true;
      } else {
        this.$refs.MediaPopup.style.bottom = "10px";
        this.$refs.PlayList.style.right = "-530px";
      }
    },
    logout: function () {
      this.Logout();
    },
    toggleCollapse: function () {
      this.mColap = !this.mColap;
    },
    async getMenu() {
      await this.axios
        .get("api/FAOnlineSOP/GetMainMenu")
        .then((res) => {
          this.Menu = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    GetIcon(id) {
      if (id <= this.icons.length - 1) return this.icons[id];
      else return this.icons[this.icons.length - 1];
    },
  },
};
</script>
  
<style lang="scss" scoped>
a {
  text-decoration: none;
}
.MediaPopup {
  z-index: 997;
  position: fixed;
  width: 550px;
  right: 20%;
  bottom: -200px;
  transition: bottom 0.5s ease-in-out;
}

.PlayList {
  background-color: #b760c5;
  z-index: 997;
  position: fixed;
  width: 550px;
  right: -550px;
  transition: right 0.5s ease-in-out;
}

.elmenu {
  i {
    margin-right: 3px;
    font-size: 1.3em;
    color: rgb(255, 252, 57);
  }
}

i:active {
  color: red;
}

.el-header {
  background-color: #37314d;
  display: flex;
  justify-content: space-between;
  padding-left: 0%;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.el-header > div {
  display: flex;
  align-items: center;
}

.el-header > div > span {
  margin-left: 15px;
}

.drawer__footer {
  display: flex;
  align-items: center;
}

.el-header > div > img {
  height: 60px;
  background-color: #eee;
}

.el-aside {
  background-color: #333744;
}

.el-aside > .el-menu {
  border-right: none;
}

.el-main {
  background-color: #1f144b;
}

.home_container {
  height: 100%;
}

.el-submenu {
  text-align: left;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  width: auto;
}

.el-button {
  margin-left: 15px;
}

.drawer {
  padding-top: 10px;

  span {
    text-align: center;
  }
}

.drawer_content {
  padding: 20px;
}

.el-col {
  padding: 10px;
}

.el-icon-position {
  color: #eee;
  size: 50px;
}

.drop_item {
  font-size: 20px;
}

.el-icon-position {
  cursor: pointer;
}
</style>
  