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
        <q-btn :label="line.name" glossy color="orange" text-color="black">
          <q-menu
            transition-show="scale"
            transition-hide="scale"
            class="bg-purple text-white"
            auto-close
          >
            <q-list
              style="min-width: 100px"
              v-for="(el, id) in lines"
              :key="id"
            >
              <q-item clickable @click="onLineChanged(el)">
                <q-item-section>{{ el.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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
      <div class="absolute-top-right z-top clock"><Myclock></Myclock></div>
      <tr>
        <td style="min-width: 500px">
          <WoTarget ref="WoTarget"></WoTarget>
        </td>
        <td style="min-width: 500px; width: 100%">
          <OutputRate ref="OutputRate"></OutputRate>
        </td>
      </tr>
      <div></div>
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
import OutputRate from "./OutputRate.vue";
import WoTarget from "./WoTarget.vue";
import StationYield from "./StationYield.vue";
import LineTotalRate from "./LineTotalRate.vue";
import Top10Issue from "./Top10Issue.vue";
import TopByStation from "./TopFailByStation.vue";
import Myclock from "../Utitils/myClock.vue";
import { AppFullscreen } from "quasar";

export default {
  name: "dash-board",
  components: {
    OutputRate,
    WoTarget,
    StationYield,
    LineTotalRate,
    Top10Issue,
    TopByStation,
    Myclock,
  },
  data() {
    return {
      refreshTime: 60000,
      timeRemain: 0,
      countDown: false,
      ctlMenu: true,
      fullScreen: false,
      models: [
        { name: "ER001", DB: "BU23" },
        { name: "ER002", DB: "BU23" },
        { name: "ER003", DB: "BU20" },
        { name: "ER004", DB: "BU23" },
        { name: "ER005", DB: "BU23" },
        { name: "ER006", DB: "BU23" },
      ],
      model: { name: "Model", DB: "BU23" },
      line: {
        name: "Line",
        id: "0",
      },
      lines: [],
      ctlBarSize: {
        witdh: 0,
        height: 0,
      },
      updateIntID: 0,
    };
  },
  unmounted() {
    clearInterval(this.updateIntID);
  },
  mounted() {},
  methods: {
    async countDownUpdate() {
      if (this.countDown) return;
      this.countDown = true;
      this.updateIntID = setInterval(() => {
        if (this.line.name != "Line" && this.line.id != 0) {
          this.UpdateChart({ PDLINE_ID: this.line.id, DB: this.model.DB });
        }
      }, this.refreshTime);
      let dem = 0;
      while (this.refreshTime > 1000) {
        dem++;
        this.timeRemain = dem / (this.refreshTime / 1000);
        await new Promise(resol => setTimeout(resol, 1000));
        if (this.timeRemain >= 1) dem = 0;
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
              this.$refs.ctlBar.style.left = `-150px`;
            }
          }, 60000);
        } else {
          this.$refs.ctlBar.style.left = `-150px`;
        }
      }

      this.ctlMenu = !this.ctlMenu;
    },
    ChangeModel(el) {
      this.model = el;
      this.line = {
        name: "Line",
        id: "10606",
      };
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
      localStorage.setItem("CurrentLine", val.name);
      this.line = val;
      setTimeout(() => {
        this.ctlBarSize = {
          witdh: this.$refs.ctlBar.clientWidth,
          height: this.$refs.ctlBar.clientHeight,
        };
      }, 200);
      this.UpdateChart({ PDLINE_ID: this.line.id, DB: this.model.DB });
    },
    UpdateChart(iLine) {
      this.countDownUpdate();
      this.$refs.OutputRate.DataUpdate(iLine);
      this.$refs.WoTarget.DataUpdate(iLine);
      this.$refs.LineTotalRate.DataUpdate(iLine);
      this.$refs.StationYield.DataUpdate(iLine);
      this.$refs.Top10Issue.DataUpdate(iLine);
      this.$refs.TopByStation.DataUpdate(iLine);
    },
    toggle() {
      if (!this.fullScreen) {
        AppFullscreen.request(this.$refs.mainPn);
      } else {
        AppFullscreen.exit();
      }
      this.fullScreen = !this.fullScreen;
      setTimeout(() => {
        if (this.line.name != "Line" && this.line.id != 0) {
          this.UpdateChart({ PDLINE_ID: this.line.id, DB: this.model.DB });
        }
      }, 1000);
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
  background-image: url("../../assets/bg1.jpg");
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
  left: -150px;
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
</style>