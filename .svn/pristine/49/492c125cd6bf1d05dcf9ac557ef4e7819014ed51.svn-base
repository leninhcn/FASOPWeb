<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :content-style="contentStyle"
    :content-active-style="contentActiveStyle"
    style="height: 100px"
  >
    <div class="myTextBox">
      <p ref="myMSG" @paste="handlePaste" class="apChild" contenteditable>
        {{ msg }}
      </p>
    </div>
  </q-scroll-area>
  <q-btn @click="ShowTest">Chan</q-btn>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      contentStyle: {
        backgroundColor: "rgba(0,0,0,0.02)",
        color: "#555",
      },
      contentActiveStyle: {
        //  backgroundColor: '#eee',
        color: "black",
      },
      thumbStyle: {
        right: "2px",
        borderRadius: "2px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: "0.75",
      },
    };
  },
  methods: {
    handlePaste(event) {
      //   event.preventDefault(); // Ngăn chặn việc dán (paste) tự động

      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData("text/plain");

      // Kiểm tra nội dung của clipboard trước khi dán vào
      if (pastedText.includes("abc")) {
        // Thực hiện xử lý tùy ý
        console.log(pastedText);
        console.log('Nội dung clipboard chứa chuỗi "abc"');
      } else {
        // Không thực hiện dán
        console.log(pastedText);
        console.log('Nội dung clipboard không chứa chuỗi "abc"');
      }
    },
    ShowTest() {
      console.log(this.$refs.myMSG.innerText);
      console.log(this.$refs.myMSG.children.length);
      const childs = this.$refs.myMSG.children;
      let temp = "";
      for (let id = 0; id < childs.length; id++) {
        const element = childs[id];
        if (element.tagName !== "IMG") {
          temp += element.innerText;
        }
      }
      console.log(temp);
    },
  },
};
</script>

<style lang="scss" scoped>
.myTextBox {
  border: 1px solid red;
  text-align: left;
  .apChild {
    height: 100%;
    color: yellow;
    &:focus {
      outline: none;
    }
  }
}
</style>