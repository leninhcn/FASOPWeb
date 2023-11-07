<template>
  <div id="pie-chart"></div>
</template>
  
  <script>
import GetOption from "./Datas/stationYield";

export default {
  data() {
    return {
      option: GetOption(),
      myChart: undefined,
      colors: [
        "#1478eb",
        "green",
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
        .post("api/FATPKanban/GetYieldDetail", line)
        .then((res) => {
          const [sr, grp] = this.GetSeries(res.data.data);
          if (sr.length > 0) {
            this.option.series = sr;
            this.option.graphic = grp;
            this.myChart.setOption(this.option);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GetSeries(data) {
      const rs = [];
      const grp = [];
      const offset =
        data.length > 0 ? Math.floor(this.myChart.getWidth() / data.length) : 1;
      var labelFromatter = {
        normal: {
          color: function (params) {
            if (params.value >= 99) {
              return "#04B404";
            } else if (params.value >= 97.5) {
              return "#0080FF";
            } else if (params.value >= 96) {
              return "#FE9A2E";
            } else {
              return "#FE2E2E";
            }
          },
          label: {
            formatter: function (params) {
              return params.value + "%";
            },
            textStyle: {
              baseline: "top",
            },
            color: "auto",
            fontSize: 20,
            position: "center",
          },
        },
      };
      var labelTop = {
        normal: {
          label: {
            show: true,
            position: "center",
            formatter: "{b}",
            textStyle: {
              baseline: "bottom",
            },
          },

          labelLine: {
            show: false,
          },
        },
      };
      var labelBottom = {
        normal: {
          color: "#ccc",
          label: {
            show: true,
            textStyle: {
              baseline: "top",
            },
            position: "center",
          },
          labelLine: {
            show: false,
          },
        },
        emphasis: {
          color: "rgba(0,0,0,0)",
        },
      };
      for (let id = 0; id < data.length; id++) {
        const el = data[id];
        grp.push({
          type: "text",
          style: {
            text: el.PROCESS_NAME,
            x: id == 0 ? id * offset + 50 : id * offset + 40,
            y: 260,
            fill: "#fff",
            font: "20px verdana",
          },
        });
        rs.push({
          type: "pie",
          center: [id == 0 ? id * offset + 80 : id * offset + 60, "50%"],
          radius: [45, 60],
          x: "0%",
          itemStyle: labelFromatter,
          data: [
            {
              name: "pass",
              value: el.PERCENT,
              itemStyle: labelTop,
              label: { show: true, fontSize: 18 },
            },
            {
              name: "fail",
              value: 100 - el.PERCENT,
              itemStyle: labelBottom,
              label: { show: false, position: "inside" },
            },
          ],
        });
      }
      return [rs, grp];
    },
  },
  mounted() {
    var dom = document.getElementById("pie-chart");
    this.myChart = this.$Echart.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option);
    }
    window.addEventListener("resize", this.myChart.resize);
    // setTimeout(() => {
    //   this.DataUpdate({ PDLINE_ID: "10003", DB: "BU20" });      
    // }, 10000);
  },
};
</script>
  
  <style lang="scss" scoped>
#pie-chart {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>