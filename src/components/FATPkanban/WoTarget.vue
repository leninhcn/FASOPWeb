<template>
  <div id="gause-chart"></div>
</template>

<script>
import GetOption from "./Datas/gauge";

export default {
  data() {
    return {
      option: GetOption(),
      myChart: undefined,
      colors: [
        "#04B404",
        "orange",
        "yellow",
        "red",
        "indigo",
        "purple",
        "#cccccc",
      ],
    };
  },
  methods: {
    DataUpdate(line) {
      this.myChart.clear();
      this.axios
        .post("api/FATPKanban/GetWoTarget", line)
        .then((res) => {
          var gaugeDT = [];
          var lc = 0;
          var grc = [];
          for (let id = 0; id < res.data.data.length; id++) {
            const el = res.data.data[id];
            switch (id) {
              case 0:
                lc = 0;
                break;
              case 1:
                lc = 25;
                break;
              case 2:
                lc = -25;
                break;
              default:
                break;
            }
            grc.push({
              type: "group",
              left: "left",
              top: id * 40 + 70,
              children: [
                {
                  type: "text",
                  z: 100,
                  left: "center",
                  top: "middle",
                  style: {
                    fill: this.colors[id],
                    text: `» ${el.WORK_ORDER}\n    [${el.OUTPUT_QTY}/${el.TARGET_QTY}]`,
                    font: "bold 14px verdana",
                  },
                },
              ],
            });
            gaugeDT.push({
              value: el.PERCENT,
              name: `${el.WORK_ORDER} [${el.OUTPUT_QTY}/${el.TARGET_QTY}]`,
              title: {
                show: false,
                offsetCenter: ["0%", `${lc - 15}%`],
                color: this.colors[id],
              },
              detail: {
                valueAnimation: true,
                offsetCenter: ["0%", `${lc}%`],
              },
            });
          }

          this.option.series[0].data = gaugeDT;
          this.option.graphic = grc;
          this.myChart.setOption(this.option);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    var dom = document.getElementById("gause-chart");
    this.myChart = this.$Echart.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option);
    }

    window.addEventListener("resize", this.myChart.resize);
  },
};
</script>

<style lang="scss" scoped>
#gause-chart {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>