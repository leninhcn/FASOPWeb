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
      this.option.series[0].data = [
        data[0].CheckInQty,
        data[1].CheckInQty,
        data[2].CheckInQty,
        data[3].CheckInQty,
      ];
      this.option.series[1].data = [
        data[0].RepairedQty,
        data[1].RepairedQty,
        data[2].RepairedQty,
        data[3].RepairedQty,
      ];
      this.option.series[2].data = [
        data[0].UnRepairedQty,
        data[1].UnRepairedQty,
        data[2].UnRepairedQty,
        data[3].UnRepairedQty,
      ];
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
