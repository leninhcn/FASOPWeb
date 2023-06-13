<template>
    <div class="main-contents">
        <el-steps :active="step" align-center finish-status="success" style="margin-top: 0;">
            <el-step v-for="(item, index) in SopDetails" :key="index" :title="`Step ${index + 1}`"
                :description="index == 0 ? 'Start' : index == SopDetails.length - 1 ? 'Finish' : 'Processing'" />
        </el-steps>
        <div class="details">
            <el-carousel v-model="CurrentIndex" @change="handleChange" trigger="click" :loop="false" :autoplay="false"
                height="500px">
                <el-carousel-item v-for="(item, index) in SopDetails" :key="index">
                    <step_details style="height: 100%;" :step_img="item.STEP_IMG.STEP_IMG_DATA" :step_name="item.STEP_NAME"
                        :step_contents="item.STEP_CONTENTS"></step_details>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

    
<script>
import step_details from './SingleStep.vue'

export default {
    mounted() {
        if (this.sop_id) this.GetSOPStepbyID(this.sop_id);
    },
    props: {
        sop_id: Number
    },
    computed: {
    },
    name: "step-details",
    data() {
        return {
            step: 1,
            CurrentIndex: 0,
            lstSOP: [1, 2, 3, 4, 5, 6],
            previewList: [],
            SopDetails: undefined
        };
    },
    methods: {
        handleChange(index) {
            this.step = index + 1;
        },
        async GetSOPStepbyID(sop_id) {
            const loading = this.$Loading.service({
                lock: true,
                text: "Loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            const response = this.axios.get(`api/FAOnlineSOP/GetSopStep/sop_id/${sop_id}`);
            return new Promise((resolve, reject) => {
                response
                    .then((result) => {
                        this.SopDetails = result.data.data;
                        if (result.data.status === 'OK') {
                            loading.close();
                            resolve(result);
                        } else {
                            loading.close();
                            this.SopDetails = undefined
                            reject(result.data.data);
                        }
                    })
                    .catch((err) => {
                        loading.close();
                        this.SopDetails = undefined
                        reject(err);
                    });
            });
        }
    },
    components: {
        step_details
    }
}
</script>

    
<style lang="scss" scoped>
.main-contents,
.details {
    height: 100%;
}

.el-carousel__item {
    height: 100%;
}

.el-carousel__item:nth-child(2n) {
    background-color: #7ac500a9;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #5aa1f388;
}
</style>
