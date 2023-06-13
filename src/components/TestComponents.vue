<template>
<div>
    <input ref="fileInput" type="file">
    <el-button @click="UploadImage">Upload</el-button>
    <el-carousel v-model="activeIndex" @change="handleChange" trigger="click" :loop="false" :autoplay="false">
        <el-carousel-item v-for="(item, index) in items" :key="index">
            <img :src="item.src">
        </el-carousel-item>
    </el-carousel>
        <el-icon><Plus /></el-icon>
        <el-icon><Message /></el-icon>
        <el-input v-model="inputData" clearable></el-input>
        <el-button type="primary" @click="TestFunction">Test Func</el-button>
</div>
</template>

<script>
export default {
    data() {
        return {
            uploadModel: {
                Name: 'FileUpload',
                FileBase: null
            },
            activeIndex: 0,
            items: [{
                    src: 'https://picsum.photos/800/300?image=0'
                },
                {
                    src: 'https://picsum.photos/800/300?image=1'
                },
                {
                    src: 'https://picsum.photos/800/300?image=2'
                },
                {
                    src: 'https://picsum.photos/800/300?image=3'
                }
            ],
            inputData:''
        }
    },
    methods: {
        handleChange(index) {
            console.log('Slide changed to', index);
        },
        UploadImage: async function () {
            console.log(this.$refs.fileInput.files[0]);
            const file = this.$refs.fileInput.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await this.axios.post('FAOnlineSOP/UploadSopImage/user/10003367', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        TestFunction(){
            this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
        }
    }
}
</script>

<style>

</style>
