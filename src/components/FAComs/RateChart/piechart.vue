<template>
  <div id="ecircle"></div>
  <div class="divPieName">
    <span>24H</span>
    <span>48H</span>
    <span>72H</span>
    <span>>72H</span>
  </div>
</template>

<script>
import GetOption from "./Datas/piechart";
export default {
  name: "pie-chart",
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
  },
  methods: {
    DataUpdate(data) {
      // this.myChart.clear();
      this.option.series[0].data = [
        { value: data[0].RepairedQty, name: "Checkout" },
        { value: data[0].UnRepairedQty, name: "Wip" },
      ];
      this.option.series[1].data = [
        { value: data[1].RepairedQty, name: "Checkout" },
        { value: data[1].UnRepairedQty, name: "Wip" },
      ];
      this.option.series[2].data = [
        { value: data[2].RepairedQty, name: "Checkout" },
        { value: data[2].UnRepairedQty, name: "Wip" },
      ];
      this.option.series[3].data = [
        { value: data[3].RepairedQty, name: "Checkout" },
        { value: data[3].UnRepairedQty, name: "Wip" },
      ];
      this.myChart.setOption(this.option);
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
.divPieName {
  position: absolute;
  top: 32%;
  span {
    margin: {
      left: 140px;
    }
    font-size: 14px;
    color: blue;
    font-weight: bold;
  }
  span:nth-child(2) {
    margin-left: 207px;
  }

  span:nth-child(3) {
    margin-left: 220px;
  }

  span:nth-child(4) {
    margin-left: 205px;
  }
}
</style>
