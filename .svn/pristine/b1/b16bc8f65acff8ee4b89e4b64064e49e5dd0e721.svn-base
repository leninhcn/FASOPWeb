<template>
  <div class="mainDiv">
    <div class="hour">
      <div ref="hour1">
        <span>{{ timeDetails.now.hour1 }}</span
        ><span>{{ timeDetails.pre_now.hour1 }}</span>
      </div>
      <div ref="hour2">
        <span>{{ timeDetails.now.hour2 }}</span
        ><span>{{ timeDetails.pre_now.hour2 }}</span>
      </div>
    </div>
    <div><span class="haicham">:</span></div>
    <div class="minute">
      <div ref="minute1">
        <span>{{ timeDetails.now.minute1 }}</span
        ><span>{{ timeDetails.pre_now.minute1 }}</span>
      </div>
      <div ref="minute2">
        <span>{{ timeDetails.now.minute2 }}</span
        ><span>{{ timeDetails.pre_now.minute2 }}</span>
      </div>
    </div>
    <div><span class="haicham">:</span></div>
    <div class="seconds">
      <div ref="seconds1">
        <span>{{ timeDetails.now.seconds1 }}</span
        ><span>{{ timeDetails.pre_now.seconds1 }}</span>
      </div>
      <div ref="seconds2" :class="{ 'move-one': moveControl.seconds2 }">
        <span>{{ timeDetails.now.seconds2 }}</span
        ><span>{{ timeDetails.pre_now.seconds2 }}</span>
      </div>
    </div>
    <!-- <span class="date">{{ date }}</span> -->
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      intervalID: undefined,
      moveControl: {
        hour1: false,
        hour2: false,
        minute1: false,
        minute2: false,
        seconds1: false,
        seconds2: false,
      },
      date: undefined,
      timeDetails: {
        now: {
          hour1: "0",
          hour2: "0",
          minute1: "0",
          minute2: "0",
          seconds1: "0",
          seconds2: "0",
        },
        pre_now: {
          hour1: "0",
          hour2: "0",
          minute1: "0",
          minute2: "0",
          seconds1: "0",
          seconds2: "0",
        },
      },
    };
  },
  beforeUnmount() {
    clearInterval(this.intervalID);
  },
  mounted() {
    this.intervalID = setInterval(() => {
      this.date = this.GetDate();
      this.ParseTimeSlide();
      if (!this.moveControl.seconds2) {
        this.moveControl.seconds2 = true;
      }
    }, 1000);
  },
  methods: {
    checkMoveAll() {
      if (
        !this.$refs.seconds1 ||
        !this.$refs.seconds2 ||
        !this.$refs.minute1 ||
        !this.$refs.minute2
      )
        return;
      if (this.timeDetails.now.seconds2 == "9") {
        this.$refs.seconds1.classList.add("move-one");
        if (this.timeDetails.now.seconds1 == "5") {
          this.$refs.minute2.classList.add("move-one");
          if (this.timeDetails.now.minute2 == "9") {
            this.$refs.minute1.classList.add("move-one");
            if (this.timeDetails.now.minute1 == "5") {
              this.$refs.hour2.classList.add("move-one");
              if (this.timeDetails.now.hour2 == "9") {
                this.$refs.hour1.classList.add("move-one");
              }
            }
          }
        }

        setTimeout(() => {
          this.$refs.seconds1.classList.remove("move-one");
          this.$refs.minute2.classList.remove("move-one");
          this.$refs.minute1.classList.remove("move-one");
          this.$refs.hour2.classList.remove("move-one");
          this.$refs.hour1.classList.remove("move-one");
        }, 2000);
      }
    },
    ParseTimeSlide() {
      const now = new Date(),
        pre_now = new Date();
      pre_now.setSeconds(pre_now.getSeconds() + 1);
      this.timeDetails.now = this.GetNowTime(now);
      this.timeDetails.pre_now = this.GetNowTime(pre_now);
      this.checkMoveAll();
      setTimeout(() => {
        this.timeDetails.now = this.timeDetails.pre_now;
        this.moveControl.seconds2 = false;
        this.$refs.seconds2.transform = "translateY(0px)";
      }, 900);
    },
    GetNowTime(time) {
      if (time) {
        const thours = time.getHours().toString().padStart(2, "0");
        const tminutes = time.getMinutes().toString().padStart(2, "0");
        const tseconds = time.getSeconds().toString().padStart(2, "0");
        const result = {
          hour1: thours.substr(0, 1),
          hour2: thours.substr(1, 1),
          minute1: tminutes.substr(0, 1),
          minute2: tminutes.substr(1, 1),
          seconds1: tseconds.substr(0, 1),
          seconds2: tseconds.substr(1, 1),
        };
        return result;
      }
    },
    GetDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.mainDiv {
  position: relative;
  // border: 1px solid black;
  padding: 0;
  overflow: hidden;
  height: 25px;
  .date {
    position: absolute;
    top: 20px;
    font-size: 1.5em;
    margin: {
      left: 20px;
    }
    color: brown;
    text-shadow: -3px -3px 5px rgba(0, 0, 0, 0.863);
  }
  div {
    position: relative;
    margin-top: -10px;
    text-align: center;
    height: 80px;
    min-width: 20px;
    display: inline-block;
    span {
      position: absolute;
      display: block;
      font-size: 30px;
      color: brown;
      text-shadow: -3px -3px 3px rgba(255, 1, 1, 0.137);
    }
    span:first-child {
      top: 0;
      left: 0%;
    }
    span:nth-child(2) {
      top: 45px;
      left: 0%;
    }
    span.haicham {
      left: 20%;
    }
  }
}
.seconds2 {
  transition: transform 0.6s;
  transform: translateY(-45px);
}
.move {
  animation-name: moveBox;
  animation-duration: 1s;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
}

.move-one {
  animation-name: moveBox;
  animation-duration: 1s;
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
}

@keyframes moveBox {
  0% {
    transform: translateY(0px);
  }
  60% {
    transform: translateY(-45px);
  }
  100% {
    transform: translateY(-45px);
  }
}
</style>