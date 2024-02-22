<template>
  <div ref="DocList" class="DocList">
    <div ref="listCard" class="listCard" v-if="!lstCollapse">
      <tr>
        <td>
          <div style="overflow-y: auto; height: 200px">
            <ul style="text-align: left">
              <li
                v-for="(track, id) in trackList"
                :key="id"
                @click="PlayFromList(track.ID)"
                :class="{
                  playingTrack: track.ID == PlayingTrack.ID,
                }"
              >
                <i
                  class="fa-solid"
                  :class="{
                    'fa-book': track.ID != PlayingTrack.ID,
                    'fa-compact-disc': track.ID == PlayingTrack.ID,
                    'fa-spin': track.ID == PlayingTrack.ID,
                  }"
                ></i>
                {{ track.FILE_NAME }}
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <hr />
      <tr>
        <td>
          <div style="overflow-y: auto">
            <ul style="text-align: left">
              <li
                v-for="(cate, id) in CategoryList"
                :key="id"
                @click="GetDocList(cate)"
                :class="{
                  playingTrack: cate == CurrentCate,
                }"
              >
                <i class="fa-solid fa-list-ul"></i> {{ cate }}
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CategoryList: [],
      trackList: [],
      PlayingTrack: {
        ID: 0,
      },
    };
  },
  mounted() {
    this.GetAllCategory();
  },
  methods: {
    async GetAllCategory() {
      await this.axios
        .get("api/Funapp/GetAllCategory")
        .then((res) => {
          this.CategoryList = res.data;
          if (this.trackList.length < 1) this.GetDocList(this.CategoryList[0]);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    UpdatePlayingTrack(id) {
      this.PlayingTrack.ID = id;
    },
    PlayFromList(id) {
      this.$emit("TrackToPlay", id);
      this.UpdatePlayingTrack(id);
    },
    async GetDocList(cate) {
      if (cate != this.CurrentCate) this.CurrentCate = cate;
      else return;
      await this.axios
        .get(`api/Funapp/GetDocList?cate=${cate}`)
        .then((res) => {
          this.trackList = res.data;
          this.$emit("PlayListUpdate", this.trackList);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            type: "error",
            message: err.response.data,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.playingTrack {
  color: rgb(0, 16, 165);
}
.DocList {
  .listCard {
    li {
      margin: 2px;
      list-style-type: none;
      cursor: pointer;
    }
  }
}
</style>