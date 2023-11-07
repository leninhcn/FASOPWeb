<template>
  <div id="bar-chart"></div>
</template>

<script>
import GetOption from "./Datas/bar";

export default {
  data() {
    return {
      option: GetOption(),
      myChart: undefined,
    };
  },
  mounted() {
    var dom = document.getElementById("bar-chart");
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
    DataUpdate(iLine) {
      this.axios
        .post("api/FATPKanban/GetOuputQty", iLine)
        .then((res) => {
          var line = localStorage.getItem("CurrentLine");
          this.option.series[0].data = [];
          for (let idx = 0; idx < res.data.data.length; idx++) {
            this.option.series[0].data.push(res.data.data[idx].outputQty);
          }
          this.option.title.text = line;
          this.option.series[0].name = line;
          this.myChart.setOption(this.option);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#bar-chart {
  position: relative;
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>