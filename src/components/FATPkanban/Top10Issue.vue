<template>
  <div id="top10-chart"></div>
</template>

<script>
import GetOption from "./Datas/top10";

export default {
  data() {
    return {
      myChart: undefined,
      option: GetOption(),
    };
  },
  methods: {
    DataUpdate(iLine) {
      this.axios
        .post("api/FATPKanban/GetTOP10Fail", iLine)
        .then((res) => {
          if (res.data.status == "OK") {
            console.log(res.data.data);
            var lgData = [],
              srData = [];
            res.data.data.forEach((el) => {
              lgData.push(el.DEFECT_CODE);
              srData.push({
                value: el.QTY,
                name: el.DEFECT_CODE,
                station: el.PROCESS_NAME,
              });
            });
            this.option.legend.data = lgData;
            this.option.series[0].data = srData;
            this.myChart.setOption(this.option);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    var dom = document.getElementById("top10-chart");
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
#top10-chart {
  height: 30vh;
  width: 100%;
  overflow: hidden;
}
</style>