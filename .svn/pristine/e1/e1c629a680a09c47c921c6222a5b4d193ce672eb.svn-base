<template>
  <div style="width: 100%">
    <div ref="ctlPanel" class="ctlPanel">
      <audio ref="player" @timeupdate="ShowCurrentTime" preload="none">
        <source :src="trackinfo.src" type="audio/mpeg" />
      </audio>
      <el-tooltip
        v-model:visible="ttvisible"
        :content="timetostring(trackinfo.current_time)"
        placement="top"
        effect="light"
        trigger="click"
        virtual-triggering
        :virtual-ref="tooltipRef"
      />

      <div class="mainPlayer">
        <input
          ref="pcTime"
          @mousedown="pg_mouseDown"
          @mouseup="pg_mouseUp"
          @mousemove="valueOnMouse"
          type="range"
          name="myRange"
          id="myRange"
          min="0"
          :max="Math.floor(trackinfo.totaltime)"
          class="slider"
          v-model="trackinfo.current_time"
        />

        <div class="btnGroupControl">
          <button class="btnPrev" @click="PreviousPlay">
            <i class="fa-solid fa-backward-fast"></i>
          </button>
          <button class="btnPlay" @click="play">
            <i v-if="!isPlaying" class="fa-solid fa-play"></i>
            <i v-if="isPlaying" class="fa-solid fa-pause"></i>
          </button>
          <button class="btnNext" @click="NextPlay">
            <i class="fa-solid fa-forward-fast"></i>
          </button>
          <button class="btnMarquee">
            <marquee scrollamount="2">{{ trackinfo.title }}</marquee>
          </button>
        </div>

        <div class="showTime">
          <p style="display: inline">
            {{ timetostring(trackinfo.current_time) }}
          </p>
          <p style="display: inline">
            / {{ timetostring(trackinfo.totaltime) }}
          </p>
        </div>
        <div class="extraControl">
          <div style="position: relative; display: inline-block">
            <i
              class="fa-solid fa-repeat"
              :class="{ extraControlActive: repeat }"
              @click="RepeatTrack"
            ></i>
            <p
              v-show="repeat"
              class="numOfRP"
              :class="{ extraControlActive: repeat }"
            >
              {{ repeatNum }}
            </p>
          </div>
          <i
            class="fa-solid fa-shuffle"
            :class="{ extraControlActive: shuffle }"
            @click="ShuffleTrack"
          ></i>
          <i
            class="fa-solid fa-bars-staggered"
            :class="{ extraControlActive: !lstCollapse }"
            @click="ShowList"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "AudioPlayer",
  props: {
    src: {
      type: String,
      required: false,
    },
    lstCollapse: {
      type: Boolean,
      required: false,
      default: true,
    },
    trackList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      shuffle: false,
      repeat: false,
      repeatNum: undefined,
      l2play: true,
      trackinfo: {
        src: "",
        title: "chan lam roi",
        current_time: 0,
        totaltime: 0,
        idx: -1,
        DB_ID: 0,
      },
      ttvisible: false,
      tooltipRef: {
        getBoundingClientRect: () => this.position,
      },
      isPlaying: false,
      //  userPaused: false,
      position: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    };
  },
  mounted() {
    var parent = this;
    this.$refs.player.addEventListener("pause", function () {
      if (parent.isPlaying) parent.isPlaying = false;
    });
    this.$refs.player.addEventListener("play", function () {
      if (!parent.isPlaying) parent.isPlaying = true;
      parent.userPaused = false;
    });
    this.$refs.player.addEventListener("ended", function () {
      parent.NextPlay();
    });
    this.$refs.player.addEventListener("seeked", function () {
      this.play();
    });
  },
  methods: {
    ShuffleTrack() {
      this.shuffle = !this.shuffle;
    },
    RepeatTrack() {
      if (!this.repeat || this.repeatNum != "A") {
        this.repeat = true;
        this.repeatNum = this.repeatNum == "1" ? "A" : "1";
      } else {
        this.repeat = false;
      }
    },
    PreviousPlay() {
      const temp = this.trackinfo.idx - 1;
      if (temp >= 0) this.PlayFromList(this.trackList[temp].ID);
    },
    NextPlay() {
      const temp = this.trackinfo.idx + 1;
      if (temp < this.trackList.length)
        this.PlayFromList(this.trackList[temp].ID);
    },
    PlayFromList(id) {
      if (!this.$refs.player.paused) this.pause();
      this.trackList.forEach((el, idx) => {
        if (el.ID == id) {
          this.trackinfo = {
            src: `${this.axios.defaults.baseURL}api/Funapp/StreamAudio?id=${el.ID}`,
            title: el.FILE_NAME,
            current_time: 0,
            totaltime: 0,
            idx: idx,
            DB_ID: id,
          };
          this.l2play = true;
          setTimeout(() => this.play(), 100);
          return;
        }
      });
    },
    ShowList() {
      // this.lstCollapse = !this.lstCollapse;
      this.$emit("ShowList");
    },
    play() {
      if (this.trackinfo.idx == -1) {
        this.NextPlay();
        console.log("NextPlay");
        return;
      }

      if (!this.isPlaying) {
        if (this.trackinfo.src) {
          if (this.l2play) {
            this.$refs.player.load();
            this.l2play = false;
          }
          this.$refs.player.play();
        }
      } else this.pause();
      this.$emit("CurrentTrackUpdate", this.trackinfo);
    },
    ShowCurrentTime() {
      if (this.ttvisible) return;
      if (this.$refs.player)
        this.trackinfo.current_time = this.$refs.player.currentTime;
      if (this.$refs.player)
        this.trackinfo.totaltime = this.$refs.player.duration;
    },
    pause() {
      this.userPaused = true;
      this.$refs.player.pause();
    },
    pg_mouseDown() {
      this.ttvisible = true;
    },
    pg_mouseUp() {
      this.ttvisible = false;
      this.$refs.player.currentTime = this.trackinfo.current_time;
    },
    valueOnMouse: function (e) {
      if (this.ttvisible) {
        const rec = this.$refs.pcTime.getBoundingClientRect();
        this.position = DOMRect.fromRect({
          width: 10,
          height: 10,
          x: e.clientX,
          y: rec.top,
        });
      }
    },
    timetostring: function (time) {
      var sec_num = parseInt(time, 10);
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
  },
};
</script>

<style lang="scss" scoped>
.mainPlayer {
  position: relative;
  background-color: #262727de;
  #myRange {
    width: 100%;
  }

  .extraControlActive {
    color: white;
  }
  .extraControl {
    position: absolute;
    right: 40px;
    top: 60%;
    i {
      margin: {
        left: 5px;
        right: 5px;
      }
      cursor: pointer;
    }
    .numOfRP {
      position: absolute;
      top: -5px;
      right: -2px;
      font-size: x-small;
      border-radius: 5px;
      width: 15px;
    }
  }

  .showTime {
    position: absolute;
    top: 20%;
    right: 0px;
    padding: {
      left: 5px;
      right: 12px;
    }
    margin: {
      right: 0;
    }
    p {
      color: rgb(255, 251, 1);
    }
    text-align: right;
  }

  .btnGroupControl {
    text-align: left;
    .btnPrev,
    .btnNext,
    .btnPlay {
      background: transparent;
      cursor: pointer;
      box-shadow: 2px 2px 4px 2px rgba(221, 197, 197, 0.336);
      transition: box-shadow 0.1s ease-out, transform 0.3s ease-in-out;
      &:active {
        outline: none;
        box-shadow: 0 0 50px 20px rgba(53, 166, 247, 0.7);
        background-color: rgba(145, 201, 241, 0.7);
      }
      &:focus {
        outline: none;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
    padding: {
      top: 5px;
      bottom: 5px;
    }
  }
  .btnPlay {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: {
      left: 8px;
      right: 8px;
    }
  }
  .btnPrev,
  .btnNext {
    border: none;
  }
  .btnMarquee {
    border: none;
    width: 50%;
    margin-left: 8px;
    background-color: transparent;
    &:focus {
      outline: none;
    }
    marquee {
      color: rgb(255, 174, 0);
      margin: {
        bottom: -8px;
      }
    }
  }
  .btnPrev {
    margin: {
      left: 8px;
    }
  }
}

input[type="range"]::-webkit-slider-thumb {
  border-radius: 50%;
  box-shadow: 0px 0px 15px 0px rgb(253, 255, 142);
}
</style>
  