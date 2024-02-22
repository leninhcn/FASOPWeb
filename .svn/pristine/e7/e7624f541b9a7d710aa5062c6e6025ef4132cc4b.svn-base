<template>
    <div class="eltb">
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
            <el-form-item label="Serial Number">
                <el-input v-model="searchData.serial_number" @keyup.enter="LoadSNError" placeholder="Serial Number" />
            </el-form-item>
            <el-form-item label="Error Code">
                <el-select @change="getSOPbyErrorCode"
                    v-model="searchData.er_code" placeholder="Error Code">
                    <el-option v-for="(item, index) in snErrorCodes" :key="index" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="sop_list" @row-click="handleRowClick" :row-style="rowCustomStyle">
            <el-table-column property="DEFECT_CODE" label="Error Code" />
            <el-table-column property="SOP_NAME" label="SOP Name" />
            <el-table-column property="DESCRIPTIONS" label="Descriptions" />
            <el-table-column property="UPDATE_TIME" label="Update Time" />
            <el-table-column property="UPDATE_USER" label="Update User" />
        </el-table>
        <el-dialog v-model="showDetail" :title="current_sop_name">
            <sop_step v-if="showDetail" :sop_id="current_id"></sop_step>
        </el-dialog>
    </div>
</template>

<script>
import sop_step from './StepDetails.vue'
import {
    mapActions,
    mapGetters,
    mapMutations
} from "vuex";
export default {
    mounted() {
        this.UpdateSOP(undefined);
        this.GetExistedErrorCode();
    },
    unmounted() {
        this.UpdateSOP(undefined);
        this.UpdateSOPstep(undefined);
        this.current_id = 0;
    },
    computed: {
        ...mapGetters({
            sop_list: 'getSOPList',
            sop_stt: 'getSOPstatus'
        })
    },
    data() {
        return {
            searchData: {
                serial_number: '',
                er_id: '',
                er_code: ''
            },
            showDetail: false,
            current_id: 0,
            current_sop_name: '',
            gridData: [],
            snErrorCodes: ['N/A']
        }
    },
    methods: {
        ...mapActions(['GetSOPErrorCode']),
        ...mapMutations(['UpdateSOP', 'UpdateSOPstep']),
        async getSOPbyErrorCode(er_code) {
            await this.GetSOPErrorCode(er_code).catch((err) => {
                this.$message({
                    showClose: true,
                    type: "error",
                    message: err.response.data,
                });
            })
        },
        handleRowClick(row) {
            this.current_id = row.SOP_ID;
            this.current_sop_name = row.SOP_NAME;
            this.showDetail = true;
        },
        rowCustomStyle() {
            return {
                cursor: 'pointer'
            };
        },
        async GetExistedErrorCode() {
            await this.axios.get('api/FAOnlineSOP/GetAllExistedError').then((res) => {
                this.snErrorCodes = [];
                res.data.forEach(item => {
                    this.snErrorCodes.push(item.DEFECT_CODE);
                });
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        LoadSNError: async function () {
            if (!this.searchData.serial_number) {
                this.UpdateSOP(undefined);
                return null;
            }
            await this.axios.get(`api/FAOnlineSOP/GetSNErrorCode/sn/${this.searchData.serial_number}`)
                .then((result) => {
                    this.snErrorCodes = [];
                    if (result.data.length > 0) {
                        // result.data.forEach(item => {
                        //     this.snErrorCodes.push(item.DEFECT_CODE);
                        // });
                        this.searchData.er_code = result.data[0].DEFECT_CODE;
                        this.GetSOPErrorCode(this.searchData.er_code);
                    }
                })
                .catch((err) => {
                    this.$message({
                        showClose: true,
                        type: "error",
                        message: err.response.data,
                    });
                    this.UpdateSOP(undefined);
                    // this.snErrorCodes = ['N/A'];
                    this.searchData.er_code = ''
                });
        },
        onSubmit() {
            if (!this.searchData.er_code) return;
            this.GetSOPErrorCode(this.searchData.er_code);
        }
    },
    components: {
        sop_step
    }
}
</script>

<style lang="scss" scoped>
.eltb {
    height: 89vh;
}
</style>
