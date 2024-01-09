<template>
  <div id="rate-chart"></div>
</template>

<script>
import GetXPositionOfGause from "./LOGIDatas/calculatePosition"
export default {
  data() {
    return {
      option: {
        title: {
          text: "YIELD RATE BY TEST STATION",
          subtext: "Final yield rate",
          x: "center",
          y: 10,
          textStyle: { color: "black", fontSize: 18 },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}%",
        },
        // graphic: [
        //   this.GetDefaultGraphic(1),
        //   this.GetDefaultGraphic(2),
        //   this.GetDefaultGraphic(3),
        //   this.GetDefaultGraphic(4),
        //   this.GetDefaultGraphic(5),
        // ],
        series: [
          this.GetDefaultSeries(0, 5),
          this.GetDefaultSeries(1, 5),
          this.GetDefaultSeries(2, 5),
          this.GetDefaultSeries(3, 5),
          this.GetDefaultSeries(4, 5),
        ],
      },

      myChart: undefined,
    }
  },
  methods: {
    GetDefaultGraphic(index) {
      return {
        type: "text",
        style: {
          text: "TEST STATION " + index,
          x: index * 230 - 130,
          y: 230,
          fill: "black",
          font: "bold 15px verdana",
        },
      }
    },
    GetDefaultSeries(index, count) {
      return {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        center: [`${GetXPositionOfGause(index, count)}%`, "50%"],
        pointer: {
          show: false,
        },

        progress: {
          show: true,
          overlap: false,
          roundCap: false,
          clip: true,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#ffffff",
          },
        },
        color: ["#04B404", "rgb(253, 2, 253)", "purple", "#cccccc"],
        axisLine: {
          lineStyle: {
            width: 20,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 20,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 30,
        },
        radius: "50%",
        data: [
          {
            value: 100,
            name: "Final yield rate",
            title: {
              show: false,
              offsetCenter: ["0%", "50%"],
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ["0%", "-25%"],
            },
          },
          {
            value: 99,
            name: "First pass yield rate",
            title: {
              show: false,
              offsetCenter: ["0%", "27%"],
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ["0%", "20%"],
            },
          },
        ],
        title: {
          fontSize: 8,
        },
        detail: {
          width: 60,
          height: 12,
          fontSize: 16,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 1,
          formatter: "{value}%",
        },
      }
    },
    DataUpdate(iLine) {
      this.axios
        .post("api/FATPKanban/LOGI/GetYieldDetailLOGI", iLine)
        .then((res) => {
          if (res.data.status == "OK") {
            console.log(res.data.data)
            this.myChart.clear()
            const [sr, grp] = this.GetSeriesData(res.data.data)
            if (sr.length > 0) {
              this.option.series = sr
              this.option.graphic = grp
              this.myChart.setOption(this.option)
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })

      //console.log(iLine)
      //this.myChart.clear()
      // const fakeData = [
      //   {
      //     PERCENT: "99.92",
      //     PROCESS_NAME: "FT Test-Turbot BLE PRO",
      //     FIRST_RATE: "99.58",
      //   },
      //   {
      //     PERCENT: "99.84",
      //     PROCESS_NAME: "FT Test-Turbot BLE PRO",
      //     FIRST_RATE: "99.5",
      //   },
      // {
      //   PERCENT: "99.84",
      //   PROCESS_NAME: "RF Test",
      //   FIRST_RATE: "99.5",
      // },
      // {
      //   PERCENT: "99.84",
      //   PROCESS_NAME: "RF Test-Turbot",
      //   FIRST_RATE: "99.5",
      // },
      // {
      //   PERCENT: "99.84",
      //   PROCESS_NAME: "RF Test",
      //   FIRST_RATE: "99.5",
      // },
      //]
      // const [sr, grp] = this.GetSeriesData(fakeData)
      // this.option.series = sr
      // this.option.graphic = grp
      // this.myChart.setOption(this.option)
    },
    GetSeriesData(data) {
      const rs = []
      const grp = []
      //const offset =
      //data.length > 0 ? Math.floor(this.myChart.getWidth() / data.length) : 1
      const calY = this.myChart.getHeight()
      for (let id = 0; id < data.length; id++) {
        const el = data[id]
        grp.push({
          type: "text",
          style: {
            text: el.PROCESS_NAME,
            //x: id * offset + 100 - el.PROCESS_NAME.length * 4,
            x:
              (GetXPositionOfGause(id, data.length) / 100) *
                this.myChart.getWidth() -
              el.PROCESS_NAME.length * 4.2,
            y: calY - 50,
            fill: "black",
            font: "bold 14px verdana",
          },
        })

        let datas = [
          {
            value: el.PERCENT,
            name: "Final yield rate",
            title: {
              show: false,
              offsetCenter: ["0%", "50%"],
            },
            detail: {
              valueAnimation: true,
              offsetCenter: ["0%", "0%"],
            },
          },
          // {
          //   value: el.FIRST_RATE,
          //   name: "First pass yield rate",
          //   title: {
          //     show: false,
          //     offsetCenter: ["0%", "27%"],
          //   },
          //   detail: {
          //     valueAnimation: true,
          //     offsetCenter: ["0%", "20%"],
          //   },
          // },
        ]
        rs.push({
          type: "gauge",
          startAngle: 90,
          endAngle: -270,
          //center: [id == 0 ? id * offset + 120 : id * offset + 90, "50%"],
          center: [`${GetXPositionOfGause(id, data.length)}%`, "50%"],
          pointer: {
            show: false,
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: false,
            clip: true,
            itemStyle: {
              borderWidth: 1,
              borderColor: "#ffffff",
            },
          },
          color: ["#04B404", "rgb(253, 2, 253)", "purple", "#cccccc"],
          axisLine: {
            lineStyle: {
              width: 20,
            },
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 20,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            distance: 30,
          },
          radius: "50%",
          data: datas,
          title: {
            fontSize: 8,
          },
          detail: {
            width: 60,
            height: 12,
            fontSize: 16,
            color: "inherit",
            borderColor: "inherit",
            borderRadius: 20,
            borderWidth: 1,
            formatter: "{value}%",
          },
        })
      }
      return [rs, grp]
    },
  },
  mounted() {
    var dom = document.getElementById("rate-chart")
    this.myChart = this.$Echart.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    })
    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option)
    }

    window.addEventListener("resize", this.myChart.resize)
  },
}
</script>

<style lang="scss" scoped>
#rate-chart {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>
