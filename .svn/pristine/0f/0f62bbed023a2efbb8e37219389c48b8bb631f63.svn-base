<template>
  <div id="ecircle"></div>
</template>

<script>
import GetXPositionOfGause from "./LOGIDatas/calculatePosition"
export default {
  data() {
    return {
      myChart: undefined,
      option: {
        title: {
          text: "TOP5 ISSUE BY STATION",
          // subtext: 'Current 1~2 hours',
          textStyle: { color: "black" },
          y: 0,
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        calculable: true,
        graphic: [],
        series: [
          this.GetDefaultSeries(0, 5),
          this.GetDefaultSeries(1, 5),
          this.GetDefaultSeries(2, 5),
          this.GetDefaultSeries(3, 5),
          this.GetDefaultSeries(4, 5),
        ],
      },
      colors: [
        "#04B404",
        "orange",
        "yellow",
        "red",
        "indigo",
        "purple",
        "#cccccc",
      ],
    }
  },
  mounted() {
    var dom = document.getElementById("ecircle")
    this.myChart = this.$Echart.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    })

    if (this.option && typeof this.option === "object") {
      this.myChart.setOption(this.option)
    }
    window.addEventListener("resize", this.myChart.resize)
  },
  methods: {
    GetDefaultSeries(index, count) {
      return {
        name: "",
        type: "pie",
        radius: "45%",
        center: [`${GetXPositionOfGause(index, count)}%`, "45%"],
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
        data: [
          { value: 3, name: "ER0001" },
          { value: 10, name: "ER0002" },
          { value: 2, name: "ER0003" },
          { value: 5, name: "ER0004" },
          { value: 8, name: "ER0005" },
        ],
      }
    },
    getChartData(iData) {
      const data = []
      for (let id = 0; id < iData.length; id++) {
        const el = iData[id]
        data.push({ value: el.QTY, name: el.DEFECT_CODE })
      }
      return data
    },
    addgraphic(value, xx, yy) {
      var res = {
        type: "text",
        style: {
          text: value,
          x: xx,
          y: yy,
          fill: "black",
          //fontSize: 25,
          font: "bold 14px verdana",
        },
      }
      return res
    },
    DataUpdate(iLine) {
      this.myChart.clear()
      this.axios
        .post("api/FATPKanban/LOGI/GetTOP5FailByStationLOGI", iLine)
        .then((res) => {
          if (res.data.status == "OK" && res.data.data.DATA.length > 0) {
            const sr = []
            const grap = []
            for (let i = 0; i < res.data.data.DATA.length; i++) {
              const el = res.data.data.DATA[i]
              //const xx = (i * 20 + 10) * (this.myChart.getWidth() / 100) //i * 245 + 100;
              grap.push(
                this.addgraphic(
                  el.PROCESS_NAME,
                  (GetXPositionOfGause(i, res.data.data.DATA.length) / 100) *
                    this.myChart.getWidth() -
                    el.PROCESS_NAME.length * 4.2,
                  this.myChart.getHeight() - 50
                )
              )
              sr.push({
                name: el.PROCESS_NAME,
                type: "pie",
                radius: "45%",
                //center: [`${i * 20 + 10}%`, "45%"],
                center: [
                  `${GetXPositionOfGause(i, res.data.data.DATA.length)}%`,
                  "50%",
                ],
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
              })
            }
            this.option.series = sr
            this.option.graphic = grap
            this.myChart.setOption(this.option)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
#ecircle {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>
