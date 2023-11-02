<template>
  <div class="MainDashboard">
    <div class="absolute-top-left z-top">
      <q-btn-group push>
        <q-btn
          :label="model.name"
          icon="dashboard"
          glossy
          color="yellow"
          text-color="black"
        >
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
        <q-btn icon="double_arrow" glossy color="amber" text-color="black" />
        <q-btn
          :label="line.name"
          icon="menu"
          glossy
          color="orange"
          text-color="black"
        >
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
      </q-btn-group>
    </div>
    <div ref="mainPn" style="width: 100%" class="mainPn">
      <div class="absolute-top-right z-top">
        <q-btn
          @click="toggle"
          :icon="fullScreen ? 'fullscreen_exit' : 'fullscreen'"
          flat
        ></q-btn>
      </div>
      <tr>
        <td style="min-width: 570px">
          <WoTarget ref="WoTarget"></WoTarget>
        </td>
        <td style="min-width: 500px; width: 100%">
          <OutputRate ref="OutputRate"></OutputRate>
        </td>
      </tr>
      <tr>
        <td></td>
        <td><StationYield ref="StationYield"></StationYield></td>
      </tr>
    </div>
  </div>
</template>

<script>
import OutputRate from "./OutputRate.vue";
import WoTarget from "./WoTarget.vue";
import StationYield from "./StationYield.vue";

import { AppFullscreen } from "quasar";

export default {
  name: "dash-board",
  components: {
    OutputRate,
    WoTarget,
    StationYield,
  },
  data() {
    return {
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
        id: "10606",
      },
      lines: [],
    };
  },
  methods: {
    ChangeModel(el) {
      this.model = el;
      this.line = {
        name: "Line",
        id: "10606",
      };
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
      this.line = val;
      this.$refs.OutputRate.DataUpdate({
        PDLINE_ID: val.id,
        DB: this.model.DB,
      });
      this.$refs.WoTarget.DataUpdate({ PDLINE_ID: val.id, DB: this.model.DB });
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
  top:-18px;
  left: -20px;
  padding: 0;
}
.mainPn{
  background-image: url('../../assets/bg1.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 94vh;
}
</style>