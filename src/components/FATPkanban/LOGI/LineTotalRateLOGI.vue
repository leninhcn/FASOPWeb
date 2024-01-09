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
            center: ["50%", "65%"],
            radius: "90%",
            min: 70,
            max: 100,
            axisLine: {
              lineStyle: {
                width: 20,
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
              distance: -20,
              length: 8,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            splitLine: {
              distance: -20,
              length: 20,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 35,
              fontSize: 16,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}%",
              color: "inherit",
              fontSize: 22,
            },
            data: [{ value: 99, name: "TEST SATITON TOTAL RATE" }],
            title: {
              offsetCenter: ["0%", "-128%"],
              fontSize: 18,
              color: "black",
              fontWeight: "bold",
              fontfamily: "Avenir, Helvetica, Arial, sans-serif",
            },
          },
        ],
      },
      myChart: undefined,
    }
  },
  methods: {
    DataUpdate(iLine) {
      this.axios
        .post("api/FATPKanban/LOGI/GetYieldTotalLOGI", iLine)
        .then((res) => {
          this.myChart.clear()
          if (res.data.status == "OK") {
            this.option.series[0].data = [
              {
                value: res.data.data[0].TOTAL_RATE,
                name: "TEST SATITON TOTAL RATE",
              },
            ]
            this.myChart.setOption(this.option)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    var dom = document.getElementById("e-chart")
    this.myChart = this.$Echart.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    })

    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option)
    }

    window.addEventListener("resize", this.myChart.resize)
    // setTimeout(() => {
    //   this.DataUpdate({ PDLINE_ID: "10003", DB: "BU20" });
    // }, 5000);
  },
}
</script>

<style lang="scss" scoped>
#e-chart {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>
