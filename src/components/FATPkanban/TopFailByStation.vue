<template>
  <div id="ecircle"></div>
</template>

<script>
import GetOption from "./Datas/topbyStation";
export default {
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

  //  setTimeout(() => {
  //    this.DataUpdate({ PDLINE_ID: "10004", DB: "BU20" });
  //  }, 2000);
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
            console.log(res.data.data);
            const sr = [];
            const grap = [];
            for (let i = 0; i < res.data.data.DATA.length; i++) {
              const el = res.data.data.DATA[i];
              const xx = (i * 20 + 10) * (this.myChart.getWidth() / 100); //i * 245 + 100;
              grap.push(this.addgraphic(el.PROCESS_NAME, xx-i*5, 250));
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
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>