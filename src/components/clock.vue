<template>
  <div id="clock">
    <p class="date">{{ clock.date }}</p>
    <p class="time">{{ clock.time }}</p>
    <p class="text">
      Accept what you can’t change. Change what you can’t accept.
    </p>
  </div>
</template>

<script>
export default {
  name: "clock-show",
  methods: {
    updateTime: function() {
      var cd = new Date();
      this.clock.time =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.clock.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        this.week[cd.getDay()];
    },
    zeroPadding: function(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  data() {
    return {
      clock: { time: "", date: "" },
      week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    };
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}
body {
  background: #0f3854;
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%;
}
p {
  margin: 0;
  padding: 0;
}
#clock {
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  position: absolute;
 top: 40%;
 left: 55%;
  transform: translate(-50%, -50%);
  color: #edff4f;
  // text-shadow: 0 0 5px rgb(235, 255, 122), 0 0 10px rgba(255, 253, 121, 0.822);
  .time {
    letter-spacing: 0.05em;
    font-size: 80px;
    padding: 5px 0;
  }
  .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }
  .text {
    letter-spacing: 0.1em;
    font-size: 14px;
    padding: 0;
  }
}
</style>
