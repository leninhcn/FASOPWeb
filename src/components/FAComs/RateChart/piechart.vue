<template>
  <div id="ecircle"></div>
  <div class="divPieName">
    <span>24H</span>
    <span>48H</span>
    <span>72H</span>
    <span>>72H</span>
  </div>
</template>

<script>
import GetOption from "./Datas/piechart";
export default {
  name: "pie-chart",
  data() {
    return {
      myChart: undefined,
      option: GetOption(),
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
  mounted() {
    var dom = document.getElementById("ecircle");
    this.myChart = this.$Echart.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option);
    }
    window.addEventListener("resize", this.myChart.resize);
  },
  methods: {
    getChartData(iData) {
      const data = [];
      for (let id = 0; id < iData.length; id++) {
        const el = iData[id];
        data.push({ value: el.QTY, name: el.DEFECT_CODE });
      }
      return data;
    },
    addgraphic(value, xx, yy) {
      var res = {
        type: "text",
        style: {
          text: value,
          x: xx,
          y: yy,
          fill: "#FFF",
          //fontSize: 25,
          font: "bold 16px verdana",
        },
      };
      return res;
    },
    DataUpdate(iLine) {
      this.myChart.clear();
      this.axios
        .post("api/FATPKanban/GetTOP5FailByStation", iLine)
        .then((res) => {
          if (res.data.status == "OK") {
            const sr = [];
            const grap = [];
            for (let i = 0; i < res.data.data.DATA.length; i++) {
              const el = res.data.data.DATA[i];
              const xx = (i * 20 + 10) * (this.myChart.getWidth() / 100); //i * 245 + 100;
              grap.push(this.addgraphic(el.PROCESS_NAME, xx - i * 5, 250));
              sr.push({
                name: el.PROCESS_NAME,
                type: "pie",
                radius: "45%",
                center: [`${i * 20 + 10}%`, "45%"],
                color: this.colors,
                label: {
                  normal: {
                    formatter: "{b}:{c}",
                    show: true,
                    position: "outside",
                  },
                },
                labelLine: {
                  normal: {
                    show: true,
                  },
                },
                data: this.getChartData(el.INFO),
              });
            }
            this.option.series = sr;
            this.option.graphic = grap;
            this.myChart.setOption(this.option);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#ecircle {
  height: 25vh;
  width: 100%;
  overflow: hidden;
}
.divPieName {
  position: absolute;
  top: 70%;
  span {
    margin: {
      left: 110px;
    }
    font-size: 14px;
    color: blue;
    font-weight: bold;
  }
  span:nth-child(2) {
    margin-left: 170px;
  }

  span:nth-child(3) {
    margin-left: 175px;
  }

  span:nth-child(4) {
    margin-left: 155px;
  }
}
</style>
