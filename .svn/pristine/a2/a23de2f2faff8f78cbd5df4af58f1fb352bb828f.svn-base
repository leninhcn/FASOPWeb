<template>
  <q-btn
    v-morph:btn:mygroup:300.resize="morphGroupModel"
    class="fixed-bottom-right q-ma-md"
    fab
    color="primary"
    size="lg"
    icon="chat"
    @click="nextMorph"
    style="z-index: 999;"
  />

  <q-card
    v-morph:card1:mygroup:500.resize="morphGroupModel"
    class="fixed-bottom-right transparent-card"
    style="width: 900px; z-index: 999;"
  >
    <MainBox v-if="morphGroupModel == 'card1'"
      @CloseChatBox="nextMorph"
    ></MainBox>
  </q-card>
</template>

<script>
import MainBox from "./MainAppForm.vue";
export default {
  components: {
    MainBox,
  },
  data() {
    return {
      morphGroupModel: "btn",
      nextMorphStep: {
        btn: "card1",
        card1: "btn",
      },
    };
  },
  methods: {
    nextMorph() {
      this.morphGroupModel = this.nextMorphStep[this.morphGroupModel];
    },
  },
};
</script>

<style lang="scss" scoped>
.transparent-card {
  background-color: transparent;
  box-shadow: none;
}
.reset-component {
  height: 80vh;
}
</style>