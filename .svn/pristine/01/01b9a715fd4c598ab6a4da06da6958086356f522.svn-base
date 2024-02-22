<template>
  <div class="main">
    <div :title="GroupName" class="GroupName">{{ GroupName }}</div>
    <p class="LastSentTime">{{LastTime}}</p>
    <div class="EllText" style="">
      {{ LastMsg }}
    </div>
    <p class="UnreadNum" v-if="UnreadNum > 0">
      {{ UnreadNum }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    GroupName: { type: String, default: "Đây là group chat" },
    LastMsg: { type: String, default: "No Message" },
    LastTime:{ type: String, default: "15 minutes ago" },
    UnreadNum: { type: Number, default: 0 },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main {
  max-width: 250px;
  position: relative;
}
.EllText {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 170px;
  font-size: x-small;
  color: #00000070;
  margin-left: 5px;
}
.UnreadNum {
  background-color: rgb(0, 38, 255);
  margin-left: 5px;
  width: 12px;
  position: absolute;
  border-radius: 50%;
  color: rgb(255, 255, 255);
  font-size: x-small;
  top: 20px;
  right: 3px;
}
.GroupName {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 120px;
  text-align: left;
  font-size: medium;
  color: black;
}
.LastSentTime {
  position: absolute;
  top: 0px;
  right: 2px;
  color: #00000070;
  font-size: x-small;
}
</style>