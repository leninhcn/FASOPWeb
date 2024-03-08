<template>
  <div class="MainDashboard">
    <div class="absolute-top-left z-top ctlBar" ref="ctlBar">
      <q-btn-group
        ><q-btn :label="model.name" glossy color="yellow" text-color="black">
          <q-menu
            transition-show="scale"
            transition-hide="scale"
            class="bg-purple text-white"
            auto-close
          >
            <q-list
              style="min-width: 100px"
              v-for="(el, id) in models"
              :key="id"
            >
              <q-item clickable @click="ChangeModel(el)">
                <q-item-section>{{ el.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-separator vertical />
        <q-btn label="Line" glossy color="orange" text-color="black">
          <q-menu
            transition-show="scale"
            transition-hide="scale"
            class="bg-purple text-white"
            auto-close
          >
            <q-checkbox
              v-model="selectAllLine"
              label="Select All Line"
              @update:model-value="onSelectAllLineChanged"
            />
            <q-list
              style="min-width: 100px"
              v-for="(el, id) in lines"
              :key="id"
            >
              <!-- <q-item clickable @click="onLineChanged(el)">
                <q-item-section>{{ el.name }}</q-item-section>
              </q-item> -->
              <q-checkbox v-model="listLine" :val="el.id" :label="el.name" />
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          glossy
          color="light-green-13"
          text-color="black"
          @click="onLineChanged(listLine)"
          >Submit</q-btn
        >
        <div
          style="font-size: 1.7em"
          ref="btnArrow"
          class="btnArrow"
          @click="btnArrowClick"
        >
          <q-icon
            :name="ctlMenu ? 'double_arrow' : 'keyboard_double_arrow_left'"
          ></q-icon>
        </div>
      </q-btn-group>
    </div>
    <div ref="mainPn" style="width: 100%" class="mainPn" id="mainPn">
      <div class="absolute-top-right z-top">
        <q-btn
          @click="toggle"
          :icon="fullScreen ? 'fullscreen_exit' : 'fullscreen'"
          flat
        ></q-btn>
      </div>
      <!-- <div class="absolute-top-right z-top clock"><Myclock></Myclock></div> -->
      <div class="clock">{{ this.timeNow }}</div>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          width: 97%;
          font-weight: bold;
          color: blue;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        Line Leader :
        <input
          type="text"
          style="
            text-transform: capitalize;
            color: blue;
            border-style: none;
            font-weight: bold;
            font-family: Arial, Helvetica, sans-serif;
          "
        />
      </div>
      <WOTable ref="WoTable" />
      <div></div>
      <br />
      <tr>
        <td style="min-width: 500px">
          <LineTotalRate ref="LineTotalRate"></LineTotalRate>
        </td>
        <td style="min-width: 500px; width: 100%">
          <StationYield ref="StationYield"></StationYield>
        </td>
      </tr>

      <div></div>
      <tr>
        <td style="min-width: 500px">
          <Top10Issue ref="Top10Issue"></Top10Issue>
        </td>
        <td style="min-width: 500px; width: 100%">
          <TopByStation ref="TopByStation"></TopByStation>
        </td>
      </tr>
      <q-linear-progress
        :value="timeRemain"
        rounded
        color="accent"
        class="q-mt-sm"
        size="1px"
        style="margin-top: 20px"
      />
    </div>
  </div>
</template>

<script>
import WOTable from "./WoTargetTable.vue";
import StationYield from "./PassRateCommonLOGI.vue";
import LineTotalRate from "./LineTotalRateLOGI.vue";
import Top10Issue from "./Top10IssueLOGI.vue";
import TopByStation from "./TopFailByStationLOGI.vue";
import { AppFullscreen } from "quasar";

export default {
  name: "dash-board",
  components: {
    WOTable,
    LineTotalRate,
    StationYield,
    Top10Issue,
    TopByStation,
  },
  data() {
    return {
      refreshTime: 90000,
      timeRemain: 0,
      countDown: false,
      ctlMenu: true,
      fullScreen: false,
      models: [
        { name: "SM006", DB: "BU23" },
        { name: "SL008", DB: "BU23" },
      ],
      model: { name: "Model", DB: "BU23" },
      lines: [],
      ctlBarSize: {
        witdh: 0,
        height: 0,
      },
      updateIntID: 0,
      windowResize: false,
      listLine: [],
      YeildDetailSize: 1000,
      timeNow: "2024/01/01 08:00",
      selectAllLine: false,
    };
  },
  unmounted() {
    // clearInterval(this.updateIntID);
    window.removeEventListener("resize", this.handelResize);
  },
  mounted() {
    //get model list
    this.GetModelList();
    setInterval(() => {
      this.updateTime();
    }, 60000);
    window.addEventListener("resize", this.handelResize);
  },
  methods: {
    handelResize() {
      this.updateTime();
      if (!this.windowResize) {
        setTimeout(() => {
          this.windowResize = false;
          if (this.listLine != undefined) {
            this.UpdateChart({ PDLINE_ID: this.listLine, DB: this.model.DB });
          }
        }, 1000);
      }
      this.windowResize = true;
    },
    onSelectAllLineChanged(v) {
      this.listLine = [];
      if (v) {
        this.lines.forEach((element) => {
          this.listLine.push(element.id);
        });
      }
      console.log(this.listLine);
    },
    GetModelList() {
      this.axios
        .post("/api/FATPKanban/GetModelList", { PRODUCT: "NOKIA", DB: "BU23" })
        .then((res) => {
          console.log(res);
          if (res.data.status == "OK" && res.data.data.length > 0) {
            this.models = [];
            res.data.data.forEach((element) => {
              this.models.push({
                name: element.model,
                modelName: element.modelName,
                DB: "BU23",
              });
            });
          }
        });
    },
    updateTime() {
      // Lấy thời gian hiện tại
      let currentDate = new Date();

      // Format thời gian theo định dạng yyyy/mm/dd hh:mm:ss
      let year = currentDate.getFullYear();
      let month = String(currentDate.getMonth() + 1).padStart(2, "0");
      let day = String(currentDate.getDate()).padStart(2, "0");
      let hours = String(currentDate.getHours()).padStart(2, "0");
      let minutes = String(currentDate.getMinutes()).padStart(2, "0");
      //let seconds = String(currentDate.getSeconds()).padStart(2, "0")

      // Hiển thị thời gian trong div
      this.timeNow = `${year}/${month}/${day} ${hours}:${minutes}`;
    },

    checkAndUpdateChart() {
      this.windowResize = false;
      console.log("thay doi kich thuoc panel");
      if (this.listLine != undefined) {
        this.UpdateChart({ PDLINE_ID: this.listLine, DB: this.model.DB });
      }
    },
    async countDownUpdate() {
      if (this.countDown) return;
      this.countDown = true;
      let dem = Math.ceil(this.refreshTime / 1000);
      while (this.refreshTime > 1000) {
        this.timeRemain = dem / (this.refreshTime / 1000);
        await new Promise((resol) => setTimeout(resol, 1000));
        dem--;
        if (this.timeRemain <= 0) {
          dem = Math.ceil(this.refreshTime / 1000);
          if (this.listLine != undefined) {
            this.UpdateChart({ PDLINE_ID: this.listLine, DB: this.model.DB });
          }
        }
      }
    },
    btnArrowClick() {
      if (this.ctlBarSize.witdh > 0) {
        if (this.ctlMenu) {
          this.$refs.ctlBar.style.left = "0px";
          setTimeout(() => {
            if (!this.ctlMenu) {
              this.ctlMenu = !this.ctlMenu;
              this.$refs.ctlBar.style.left = `-${
                this.ctlBarSize.witdh - this.$refs.btnArrow.clientWidth
              }px`;
            }
          }, 60000);
        } else {
          this.$refs.ctlBar.style.left = `-${
            this.ctlBarSize.witdh - this.$refs.btnArrow.clientWidth
          }px`;
        }
      } else {
        if (this.ctlMenu) {
          this.$refs.ctlBar.style.left = "0px";
          setTimeout(() => {
            if (!this.ctlMenu) {
              this.ctlMenu = !this.ctlMenu;
              this.$refs.ctlBar.style.left = `-230px`;
            }
          }, 60000);
        } else {
          this.$refs.ctlBar.style.left = `-230px`;
        }
      }

      this.ctlMenu = !this.ctlMenu;
    },
    ChangeModel(el) {
      this.model = el;
      setTimeout(() => {
        this.ctlBarSize = {
          witdh: this.$refs.ctlBar.clientWidth,
          height: this.$refs.ctlBar.clientHeight,
        };
      }, 200);
      this.getAllLine(el);
    },
    getAllLine(model) {
      this.axios
        .post("api/FATPKanban/GetLineNameFromModel", {
          MODEL: model.name,
          DB: model.DB,
        })
        .then((res) => {
          if (res.data.status == "OK") {
            this.lines = [];
            res.data.data.forEach((el) => {
              this.lines.push({
                name: el.PDLINE_NAME,
                id: el.PDLINE_ID,
              });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onLineChanged(val) {
      //this.listLine = [100048, 100063, 100050, 100062, 100051, 100058, 100052]
      localStorage.setItem("CurrentLine", val);
      this.listLine = val;
      setTimeout(() => {
        this.ctlBarSize = {
          witdh: this.$refs.ctlBar.clientWidth,
          height: this.$refs.ctlBar.clientHeight,
        };
      }, 200);
      this.UpdateChart({ PDLINE_ID: this.listLine, DB: this.model.DB });
      this.countDownUpdate();
    },
    UpdateChart(iLine) {
      iLine.name = this.model.name;
      iLine.modelName = this.model.modelName;
      console.log("iline: ", iLine);
      if (iLine.PDLINE_ID.length <= 0) {
        console.log("CHƯA CHỌN LINE");
        alert("Chưa chọn line");
      } else {
        this.$refs.WoTable.DataUpdate(iLine);
        this.$refs.LineTotalRate.DataUpdate(iLine);
        this.$refs.StationYield.DataUpdate(iLine);
        this.$refs.Top10Issue.DataUpdate(iLine);
        this.$refs.TopByStation.DataUpdate(iLine);
      }
    },
    toggle() {
      if (!this.fullScreen) {
        AppFullscreen.request(this.$refs.mainPn);
      } else {
        AppFullscreen.exit();
      }
      this.fullScreen = !this.fullScreen;
    },
  },
};
</script>

<style lang="scss" scoped>
.MainDashboard {
  width: 102%;
  position: relative;
  top: -18px;
  left: -20px;
  padding: 0;
}
.mainPn {
  background-image: url("@/assets/LOGI\ background.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 94vh;
  position: relative;
}
.clock {
  right: 5%;
  top: 1%;
}
.ctlBar {
  left: -230px;
  transition: left 0.5s;
}
.btnArrow {
  background: linear-gradient(
    to top,
    rgba(255, 187, 0, 0.452),
    rgb(255, 196, 0),
    rgba(255, 187, 0, 0.493)
  );
  cursor: pointer;
  transition: box-shadow 0.8s;
  &:hover {
    box-shadow: 0 0 20px rgb(251, 255, 37);
  }
}

.clock {
  margin-top: 3vh;
  margin-bottom: 0vh;
  color: blue;
  font-size: 25px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
