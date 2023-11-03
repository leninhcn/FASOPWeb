<template>
  <div id="e-chart"></div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        tooltip: {},
        series: [
          {
            type: "gauge",
            startAngle: 210,
            endAngle: -30,
            min: 70,
            max: 100,
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, "red"],
                  [0.7, "orange"],
                  [1, "#04B404"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: "#fff",
                width: 4,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 40,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}%",
              color: "inherit",
              fontSize: 14,
            },
            data: [{ value: 90, name: "Line Total Rate" }],
          },
        ],
      },
      myChart: undefined,
    };
  },
  methods: {
    DataUpdate(iLine) {
      this.axios
        .post("api/FATPKanban/GetYieldTotal", iLine)
        .then((res) => {
          if (res.data.status == "OK") {
            this.option.series[0].data = [
              { value: res.data.data[0].TOTAL_RATE, name: "Line Total Rate" },
            ];
            this.myChart.setOption(this.option);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    var dom = document.getElementById("e-chart");
    this.myChart = this.$Echart.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });

    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option);
    }

    window.addEventListener("resize", this.myChart.resize);
    setTimeout(() => {
      this.DataUpdate({ PDLINE_ID: "10003", DB: "BU20" });
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
#e-chart {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>