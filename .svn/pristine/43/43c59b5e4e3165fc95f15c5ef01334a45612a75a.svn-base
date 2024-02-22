<template>
    <div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" size="default"
            status-icon label-position="left">
            <el-form-item label="Menu name" prop="NAME">
                <el-input v-model="ruleForm.NAME" placeholder="Menu Name" />
            </el-form-item>
            <el-form-item label="Link To Route" prop="LINK_TO">
                <el-input v-model="ruleForm.LINK_TO" placeholder="Link To Route" />
            </el-form-item>
            <el-form-item label="Menu Title" prop="TITLE" required>
                <el-input v-model="ruleForm.TITLE" placeholder="Menu Title" />
            </el-form-item>
            <el-form-item label="Menu Description" prop="DESCRIPTION" required>
                <el-input v-model="ruleForm.DESCRIPTION" type="textarea" placeholder="Menu Description" />
            </el-form-item>
            <el-form-item label="Menu Type" prop="TYPE" required>
                <el-col :span="11">
                    <el-form-item prop="TYPE" required>
                        <el-select-v2 v-model="ruleForm.TYPE" placeholder="Menu Type" :options="Types" @change="SelectLevel"
                            :disabled="EditMode" />
                        <span style="margin-left: 5px">Level: {{ ruleForm.ITEM_LEVEL }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="Menu Parent" prop="PARENT_ID" required>
                        <el-select-v2 v-model="ruleForm.PARENT_ID" placeholder="Menu Parent" :options="Parents"
                            @change="SelectSeq" :disabled="EditMode" />
                        <span style="margin-left: 5px; ">SEQ: {{ ruleForm.SEQ }}</span>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="Role Require" prop="ROLE_REQUIRE">
                <el-select-v2 v-model="ruleForm.ROLE_REQUIRE" placeholder="Role Require" :options="Roles" />
            </el-form-item>
            <el-form-item label="Display Status" prop="DISPLAY_STATUS">
                <el-radio-group v-model="ruleForm.DISPLAY_STATUS">
                    <el-radio label="ENABLE" />
                    <el-radio label="DISABLE" />
                </el-radio-group>
            </el-form-item>
            <el-form-item style="padding-left: 130px;">
                <el-button type="primary" @click="submitForm()">
                    Submit
                </el-button>
                <el-button @click="resetForm()">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    props: {
        ParentName: String,
        EdittingMenu: Object,
        EditMode: Boolean
    },
    computed: {
        ...mapGetters({
            GetUser: "getUser"
        }),
    },
    mounted() {
        this.GetMenuParrent();
        if (this.EdittingMenu) this.ruleForm = this.EdittingMenu;
    },
    data() {
        return {
            Roles: Array.from({ length: 10 }).map((_, idx) => ({
                value: `${idx + 1}`,
                label: `${idx + 1}`,
            })),
            Types: [
                {
                    value: 'MENU_ITEM',
                    label: 'MENU_ITEM'
                },
                {
                    value: 'MENU_GROUP_ITEM',
                    label: 'MENU_GROUP_ITEM'
                },
                {
                    value: 'SUB_MENU',
                    label: 'SUB_MENU'
                }
            ],
            Parents: [],
            ruleForm: {
                NAME: '',
                DESCRIPTION: '',
                TYPE: undefined,
                PARENT_ID: undefined,
                SEQ: 1,
                TITLE: '',
                LINK_TO: '',
                DISPLAY_STATUS: 'ENABLE',
                ENABLE: 'Y',
                UPDATE_TIME: new Date(),
                ITEM_LEVEL: 1,
                UPDATE_USER_ID: 0,
                ID: 0,
                ROLE_REQUIRE: 2
            },
            rules: {
                NAME: [
                    { required: true, message: 'Please input Menu name', trigger: 'blur' },
                    { min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
                ],
                LINK_TO: [
                    {
                        required: true,
                        message: 'Please input router',
                        trigger: 'blur',
                    },
                ],
                DESCRIPTION: [
                    {
                        required: true,
                        message: 'Please input Menu Description',
                        trigger: 'blur',
                    },
                ],
                PARENT_ID: [
                    {
                        required: true,
                        message: 'Please select Menu Parrent',
                        trigger: 'change',
                    },
                ],
                TYPE: [
                    {
                        required: true,
                        message: 'Please select Menu Type',
                        trigger: 'change',
                    },
                ],
                TITLE: [
                    {
                        required: true,
                        message: 'Please input title',
                        trigger: 'blur',
                    },
                ],

            }
        }
    }, methods: {
        async submitForm() {
            if (!this.$refs.ruleFormRef) return

            this.ruleForm.UPDATE_USER_ID = this.GetUser.EMP_ID;

            await this.$refs.ruleFormRef.validate((valid) => {
                let url = 'api/FAOnlineSOP/AddNewMenu';
                if (valid) {
                    if (this.EditMode) {
                        url = 'api/FAOnlineSOP/UpdateMenu';
                    }
                    this.axios.post(url, this.ruleForm).then((res) => {
                        this.$message({
                            showClose: true,
                            type: "success",
                            message: res.data,
                        });
                        this.$emit('CompleteSuccess');
                    }).catch((err) => {
                        this.$message({
                            showClose: true,
                            type: "error",
                            message: err.response.data,
                        });
                    });
                } else {
                    this.$message({
                        showClose: true,
                        type: "error",
                        message: 'All fields has not complete input',
                    });
                }
            })
        },
        resetForm() {
            this.$refs.ruleFormRef.resetFields()
        }, async GetMenuParrent() {
            await this.axios.get('api/FAOnlineSOP/GetAllParrent').then((res) => {
                this.Parents.push({
                    value: 0,
                    label: 'N/A'
                });
                res.data.forEach(element => {
                    this.Parents.push({
                        value: element.ID,
                        label: element.NAME
                    })
                });
                this.Parents.forEach((el) => {
                    if (this.ParentName && el.label.includes(this.ParentName)) {
                        this.ruleForm.PARENT_ID = el.value;
                        if (!this.EditMode) this.SelectSeq(this.ruleForm.PARENT_ID);
                    }
                })
            }).catch((err) => {
                this.$message({
                    showClose: true,
                    type: "error",
                    message: err.response.data,
                });
            })
        },
        SelectLevel(value) {
            switch (value) {
                case 'MENU_ITEM':
                    this.ruleForm.ITEM_LEVEL = 3;
                    break;
                case 'MENU_GROUP_ITEM':
                    this.ruleForm.ITEM_LEVEL = 2;
                    break;
                case 'SUB_MENU':
                    this.ruleForm.ITEM_LEVEL = 1;
                    break;
                default:
                    break;
            }
        },
        SelectSeq(op) {
            if (op == 0) {
                this.axios.get('api/FAOnlineSOP/GetMaxSEQ?parentName=submenu').then((res) => {
                    this.ruleForm.SEQ = res.data.MAX_SEQ;
                }).catch((err) => {
                    this.$message({
                        showClose: true,
                        type: "error",
                        message: err.response.data,
                    });
                })
                return;
            }

            this.Parents.forEach(async (el) => {
                if (el.value == op) {
                    await this.axios.get(`api/FAOnlineSOP/GetMaxSEQ?parentName=${el.label}`).then((res) => {
                        this.ruleForm.SEQ = res.data.MAX_SEQ;
                    }).catch((err) => {
                        this.$message({
                            showClose: true,
                            type: "error",
                            message: err.response.data,
                        });
                    })
                }
            })
        }
    }
}

</script>

<style lang="scss" scoped>
.MainBox {
    background-color: #ffffff;
    box-shadow: 20px 20px 30px rgba(0, 0, 0, .4),
        40px 40px 60px rgba(0, 0, 0, .4);

    padding: {
        top: 10px;
        bottom: 10px;
        right: 10px;
    }
}
</style>