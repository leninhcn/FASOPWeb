<template>
  <div class="container" id="myMSG" ref="divContainer">
    <div v-for="(el, id) in lstElements" :key="id">
      <span v-if="el.type == 'text'" :id="`span${id}`" style="position: absolute; bottom: 0;">{{ el.value }}</span>
      <input
        v-if="el.type == 'text'"
        type="text"
        name=""
        :id="`txt${id}`"
        v-model="el.value"
        @keyup="(event) => TextMsgInput(event, id)"
      />
      <img v-if="el.type == 'img'" :src="el.value" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lstElements: [
        { type: "text", value: "", active: false },
        {
          type: "img",
          value: `${this.axios.defaults.baseURL}Images/noIMG.png`,
          active: true,
        },
      ],
      ActiveElement: undefined,
    };
  },
  mounted() {
    // document.addEventListener("click", this.ParentClickHandle);
    // document.addEventListener("keyup", this.CheckInput);
  },
  methods: {
    TextMsgInput(event, id) {
      // const textLength = this.lstElements[0].value.length;
      console.log(event, id);
      const textMeasure = document.getElementById("span0");
      console.log(textMeasure.getBoundingClientRect().width);
      event.target.style.width = `${Math.ceil(
        textMeasure.getBoundingClientRect().width + 8
      )}px`;
    },
    CheckInput(event) {
      if (event.ctrlKey && event.key === "v") {
        console.log("Đã nhấn Ctrl+V");
        // Thực hiện xử lý dán tại đây
      }
      // else {
      //   this.ActiveElement.innerText += event.key;
      // }
    },
    AddTextInput() {
      if (this.lstElements.length <= 0) {
        const container = document.getElementById("myMSG");
        const input = document.createElement("input");
        input.type = "text";
        // input.classList.add("txtInput");
        container.appendChild(input);
        this.lstElements.push({ type: "text", value: input, active: false });
        this.ActiveElement = input;
      }
    },
    ParentClickHandle(event) {
      if (this.$refs.divContainer.contains(event.target)) {
        this.AddTextInput();
      } else {
        this.ActiveElement = undefined;
        console.log("chan");
      }
    },
  },
};
</script>

<style lang="scss">
.container {
  border: 1px solid #000;
  background-color: #ffffff;
  text-align: left;
  display: flex;
  cursor: text;
  min-height: 30px;
  height: fit-content;
  input[type="text"] {
    border: 1px solid green;
    width: 10px;
    display: inline-flex;
    &:focus {
      outline: none;
    }
    margin-bottom: 0;
  }
  img {
    width: 100px;
    width: 100px;
    border: 1px solid red;
  }
}
.txtInput {
  width: 100%;
}
</style>