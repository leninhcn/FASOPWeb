<template>
    <div class="main-div">
        <h4>{{ step_name }}</h4>
        <p>{{ step_contents }}</p>
        <!-- <img style="object-fit: fill; width: 100%; height: 85%;" :src="imageFromByte(step_img)" alt="Step Image"> -->
        <el-image fit="fill" :src="imageFromByte(step_img)" :zoom-rate="1.2" :preview-src-list="PreviewList"
            preview-teleported style="height: 85%;width: 100%;" hide-on-click-modal></el-image>
    </div>
</template>

<script>
export default {
    mounted() {
        this.PreviewList = [this.imageFromByte(this.step_img)]
    },
    props: {
        step_name: String,
        step_contents: String,
        step_img: String,
    }, methods: {
        imageFromByte(strBase64) {
            return `data:image/jpeg;base64,${strBase64}`;
        },
    }, data() {
        return {
            PreviewList: []
        }
    }

}
</script>

<style lang="scss" scoped>
.main-div {
    width: 100%;
    height: 100%;
    padding: 0;

    p,
    h4 {
        color: #000;
    }
}
</style>
