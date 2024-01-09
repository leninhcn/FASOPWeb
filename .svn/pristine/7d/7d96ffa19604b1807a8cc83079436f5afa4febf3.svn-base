<template>
    <div class="mainDiv">
        <el-main>
            <el-table :data="TempData" style="width: 100%">
                <el-table-column type="expand">
                    <template #default="props">
                        <ol>
                            <li v-for="(item, index) in props.row.LstStepName" :key="index">
                                <div>
                                    <a href="#"
                                        @click.prevent="handleNewStep(false, { step_name: item, seq: index, sop: props.row })">{{
                                            item
                                        }}</a>
                                    <el-popconfirm title="Are you sure to delete this item?"
                                        @confirm="handleDeleteStep(item, props.row.SOP_ID)">
                                        <template #reference>
                                            <el-icon style="color: red; cursor: pointer; margin: 2px;">
                                                <RemoveFilled />
                                            </el-icon>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </li>
                        </ol>
                    </template>
                </el-table-column>
                <el-table-column label="SOP_NAME" prop="SOP_NAME" />
                <el-table-column label="DEFECT_CODE" prop="DEFECT_CODE" />
                <el-table-column label="DESCRIPTIONS" prop="DESCRIPTIONS" />
                <el-table-column label="UPDATE_TIME" prop="UPDATE_TIME" />
                <el-table-column label="UPDATE_USER" prop="UPDATE_USER" />
                <el-table-column align="right">
                    <template #header>
                        <div style="display: flex;">
                            <el-input style="flex: 1;margin-right: 5px;" v-model="search" @change="filterTableData"
                                size="small" placeholder="Type to search" />
                            <el-button size="small" @click="AddNewSOP" type="primary">Add New</el-button>
                        </div>
                    </template>
                    <template #default="scope">
                        <el-button title="Edit" type="primary" size="small" @click="handleEdit(scope.$index, scope.row)"><i
                                class="icofont-edit"></i></el-button>
                        <el-button title="Add New Step" type="primary" size="small"
                            @click="handleNewStep(true, { step_name: '', seq: 0, sop: scope.row })"><i
                                class="icofont-sub-listing"></i></el-button>
                        <el-popconfirm title="Are you sure to delete this?"
                            @confirm="handleDelete(scope.$index, scope.row)">
                            <template #reference>
                                <el-button title="Delete" size="small" type="danger"><i
                                        class="icofont-ui-delete"></i></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[50, 100, 200, 500]" :small="small" :disabled="false" :background="false"
                layout="total, sizes, prev, pager, next, jumper" :total="TotalPages" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-footer>
        <el-dialog v-model="ShowEdit" :title="opMode">
            <el-form v-if="ShowEdit" label-position="left" ref="ruleFormRef" :model="edittingSOP" label-width="120px"
                class="demo-ruleForm" status-icon>
                <el-form-item label="SOP Name" required prop="sop_Name">
                    <el-input v-model="edittingSOP.sop_Name" />
                </el-form-item>
                <el-form-item label="SOP ID">
                    <span class="text-gray-500">{{ edittingSOP.sop_ID }}</span>
                </el-form-item>
                <el-form-item label="Error Code" prop="defect_id" required>
                    <el-select v-model="edittingSOP.defect_id" filterable remote clearable reserve-keyword
                        placeholder="Enter a Error Code" :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="item in options" :key="item.DEFECT_ID" :label="item.DEFECT_CODE"
                            :value="item.DEFECT_ID" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Descriptions" prop="DESCRIPTIONS" required>
                    <el-input v-model="edittingSOP.DESCRIPTIONS" type="textarea" />
                </el-form-item>
                <el-form-item label="Update User">
                    <span class="text-gray-500">{{ edittingSOP.update_user }}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">
                        Submit
                    </el-button>
                    <el-button @click="ShowEdit = false">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog v-model="ShowNewStep" :title="NewstepOpMode ? 'New Step' : 'Edit Step'">
            <newstep :AddNew="NewstepOpMode" :Data="EditingStep" v-if="ShowNewStep" @CancelEvent="NewStepFinish">
            </newstep>
        </el-dialog>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from "vuex";
import newstep from './NewStep.vue'
export default {
    components: {
        newstep
    },
    computed: {
        ...mapGetters({
            sop_list: 'getSOPList',
            sop_stt: 'getSOPstatus',
            LoginUser: 'getUser'
        })
    },
    mounted() {
        this.GetAllSOP();
    },
    data() {
        return {
            TotalPages: 1,
            EditingStep: undefined,
            NewstepOpMode: false,
            loading: false,
            ShowNewStep: false,
            currentPage: 1,
            pageSize: 50,
            opMode: 'SOP Edit',
            search: '',
            TempData: [],
            ShowEdit: false,
            edittingSOP: {
                sop_Name: '',
                sop_ID: 0,
                defect_code: '',
                defect_id: '',
                DESCRIPTIONS: '',
                update_user: 0,
                old_sopName: ''
            },
            list_error: [{ DEFECT_ID: 'ER01', DEFECT_CODE: 'ER01' }],
            options: []
        }
    },
    methods: {
        ...mapActions(['GetSOPErrorCode']),
        ...mapMutations(['UpdateSOP']),
        filterTableData: function () {
            this.TempData = this.sop_list.filter(
                (data) =>
                    !this.search ||
                    data.SOP_NAME.toLowerCase().includes(this.search.toLowerCase())
            )
        }, async GetAllSOP() {
            const loading = this.$Loading.service({
                lock: true,
                text: "Loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            await this.GetSOPErrorCode('getallsop').then(() => {
                this.filterTableData();
                this.TotalPages = this.sop_list.length;
                loading.close();
            }).catch(err => {
                loading.close();
                console.log(err.response.data);
            });
        },
        NewStepFinish(pcDone) {
            if (pcDone) this.GetAllSOP();
            this.ShowNewStep = false;
        },
        handleEdit(index, row) {
            this.opMode = 'SOP Edit';
            this.edittingSOP.sop_Name = row.SOP_NAME;
            this.edittingSOP.old_sopName = row.SOP_NAME;
            this.edittingSOP.sop_ID = row.SOP_ID;
            this.edittingSOP.defect_code = row.DEFECT_CODE;
            this.edittingSOP.DESCRIPTIONS = row.DESCRIPTIONS;
            this.edittingSOP.defect_id = row.DEFECT_ID;
            this.ShowEdit = true;
            this.options = [{ DEFECT_ID: row.DEFECT_ID, DEFECT_CODE: row.DEFECT_CODE }]
        },
        handleNewStep(addNew, stepData) {
            this.EditingStep = stepData;
            this.NewstepOpMode = addNew;
            this.ShowNewStep = true;
        },
        async handleDelete(index, sop) {
            const sop_id = sop.SOP_ID;
            await this.axios.post(`api/FAOnlineSOP/DeleteSOP?sop_id=${sop_id}`).then((response) => {
                this.$message({
                    showClose: true,
                    type: "success",
                    message: response.data,
                });
                this.GetAllSOP();
            }).catch((err) => {
                this.$message({
                    showClose: true,
                    type: "error",
                    message: err.data,
                });
            });
        },
        async handleDeleteStep(step_name, sop_id) {
            const dlobj = {
                sop_id: sop_id,
                step_name: step_name,
                update_user: this.LoginUser.EMP_ID
            };
            await this.axios.post('api/FAOnlineSOP/DeleteSOPStep', dlobj).then((res) => {
                this.$message({
                    showClose: true,
                    type: "success",
                    message: res.data,
                });
                location.reload();
            }).catch((err) => {
                this.$message({
                    showClose: true,
                    type: "error",
                    message: err.response.data,
                });
            });
        },
        AddNewSOP() {
            this.edittingSOP = {
                sop_Name: '',
                sop_ID: 0,
                defect_code: '',
                defect_id: '',
                DESCRIPTIONS: '',
                update_user: this.LoginUser.EMP_ID
            };
            this.opMode = 'Add New SOP';
            this.options = [];
            this.ShowEdit = true;
        },
        async submitForm() {
            console.log(this.edittingSOP);
            if (!this.edittingSOP.sop_Name || !this.edittingSOP.defect_id || !this.edittingSOP.DESCRIPTIONS) {
                this.$message({
                    showClose: true,
                    type: "error",
                    message: "The information has not been entered completely",
                });
                return;
            }
            const api_url = this.opMode.includes('Add New') ? 'api/FAOnlineSOP/AddNewSOP' : `api/FAOnlineSOP/UpdateSOP?oldSOPname=${this.edittingSOP.old_sopName}`
            await this.axios.post(api_url, this.edittingSOP).then((response) => {
                console.log(response);
                this.$message({
                    showClose: true,
                    type: "success",
                    message: response.data,
                });
                this.ShowEdit = false;
                this.GetAllSOP();
            }).catch((err) => {
                console.log(err);
                this.$message({
                    showClose: true,
                    type: "error",
                    message: err.response.data,
                });
            });
        },
        async remoteMethod(query) {
            if (query) {
                this.loading = true;
                await this.axios.get(`api/FAOnlineSOP/GetErrorCode?filter=${query}`).then((response) => {
                    this.list_error = response.data;
                }).catch((err) => {
                    console.log(err);
                    this.list_error = []
                })
                setTimeout(() => {
                    this.loading = false
                    this.options = this.list_error.filter((item) => {
                        return item.DEFECT_CODE.toLowerCase().includes(query.toLowerCase())
                    })
                }, 500)
            } else {
                this.options = []
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.mainDiv {
    height: fit-content;
    background-color: #ffffff;
}

.el-popper.is-customized {
    /* Set padding to ensure the height is 32px */
    padding: 6px 12px;
    background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
    background: linear-gradient(45deg, #b2e68d, #bce689);
    right: 0;
}
</style>
