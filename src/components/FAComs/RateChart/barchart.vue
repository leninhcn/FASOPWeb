<template>
  <div id="chartdom"></div>
</template>

<script>
import GetOption from "./Datas/barchart";

export default {
  name: "bar-chart",
  data() {
    return {
      myChart: undefined,
      option: GetOption(),
    };
  },
  mounted() {
    var dom = document.getElementById("chartdom");
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
    DataUpdate(data) {
      console.log(data);
      this.myChart.clear();
      this.option.series[0].data = [520, 724, 645, 765];
      this.myChart.setOption(this.option);
    },
  },
};
</script>

<style lang="scss" scoped>
#chartdom {
  position: relative;
  height: 55vh;
  overflow: hidden;
}
</style>
