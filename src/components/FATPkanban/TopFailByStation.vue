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
};
</script>

<style lang="scss" scoped>
#ecircle {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>