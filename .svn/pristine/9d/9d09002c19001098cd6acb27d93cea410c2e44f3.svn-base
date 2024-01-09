<template>
  <div>
    <el-form
      label-position="left"
      ref="ruleFormRef"
      :model="stepModel"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="SOP ID">
        <span class="text-gray-500">{{ stepModel.SOP_ID }}</span>
      </el-form-item>
      <el-form-item label="Step Name" required prop="STEP_NAME">
        <el-input v-model="stepModel.STEP_NAME" />
      </el-form-item>
      <el-form-item label="Step Contents" prop="STEP_CONTENTS" required>
        <el-input v-model="stepModel.STEP_CONTENTS" type="textarea" />
      </el-form-item>
      <el-form-item label="Sequence" prop="SEQ" required>
        <span class="text-gray-500">{{ stepModel.SEQ }}</span>
      </el-form-item>
      <el-form-item label="Step Image">
        <el-upload
          v-model:file-list="fileList"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible" style="width: fit-content">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="Image ID"
        ><span class="text-gray-500">{{ stepModel.STEP_IMG.STEP_IMG_ID }}</span>
      </el-form-item>
      <el-form-item label="Update User">
        <span class="text-gray-500">{{ stepModel.UPDATE_USER }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"> Submit </el-button>
        <el-button @click="$emit('CancelEvent')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      LoginUser: "getUser",
    }),
  },
  data() {
    return {
      disabled: false,
      dialogVisible: false,
      dialogImageUrl: "",
      stepModel: {
        SOP_ID: 0,
        STEP_NAME: "",
        STEP_CONTENTS: "",
        SEQ: 0,
        STEP_IMG: { STEP_IMG_ID: 0, IMG_NAME: "", STEP_IMG_DATA: undefined },
        UPDATE_TIME: new Date(),
        UPDATE_USER: 0,
      },
      fileList: undefined,
      newIMG: false,
      oldStepName: "",
    };
  },
  props: {
    AddNew: Boolean,
    Data: Object,
  },
  async mounted() {
    if (!this.AddNew) {
      await this.axios
        .get(
          `api/FAOnlineSOP/GetSopStepbyStepName?sop_id=${this.Data.sop.SOP_ID}&step_name=${this.Data.step_name}`
        )
        .then((res) => {
          this.stepModel = {
            SOP_ID: this.Data.sop.SOP_ID,
            STEP_NAME: this.Data.step_name,
            STEP_CONTENTS: res.data.step.STEP_CONTENTS,
            SEQ: res.data.step.STEP_SEQ,
            STEP_IMG: {
              STEP_IMG_ID: res.data.step.STEP_IMG.STEP_IMG_ID,
              IMG_NAME: res.data.step.STEP_IMG.IMG_NAME,
              STEP_IMG_DATA: res.data.step.STEP_IMG.STEP_IMG_DATA,
            },
            UPDATE_TIME: new Date(),
            UPDATE_USER: this.LoginUser.EMP_ID,
          };
          this.oldStepName = this.Data.step_name;
          this.fileList = [
            {
              name: this.stepModel.STEP_IMG.IMG_NAME,
              url: this.imageFromByte(this.stepModel.STEP_IMG.STEP_IMG_DATA),
            },
          ];
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      this.stepModel = {
        SOP_ID: this.Data.sop.SOP_ID,
        STEP_NAME: "",
        STEP_CONTENTS: "",
        SEQ: 0,
        STEP_IMG: { STEP_IMG_ID: 0, IMG_NAME: "", STEP_IMG_DATA: undefined },
        UPDATE_TIME: new Date(),
        UPDATE_USER: this.LoginUser.EMP_ID,
      };
    }
  },
  methods: {
    handlePictureCardPreview: function (uploadFile) {
      this.dialogImageUrl = uploadFile.url;
      this.dialogVisible = true;
    },
    imageFromByte(strBase64) {
      return `data:image/jpeg;base64,${strBase64}`;
    },
    handleRemove: function () {
      this.newIMG = true;
    },
    async NewStep(formData) {
      await this.axios
        .post(
          `api/FAOnlineSOP/UploadSopImage/user/${this.LoginUser.EMP_ID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(async (response) => {
          this.stepModel.STEP_IMG.STEP_IMG_ID = response.data.img_id;
          await this.axios
            .post(
              `api/FAOnlineSOP/AddNewSOPStep/sop_id/${this.stepModel.SOP_ID}`,
              this.stepModel
            )
            .then((res) => {
              this.$message({
                showClose: true,
                type: "success",
                message: res.data,
              });
              this.$emit("CancelEvent", true);
            })
            .catch((err) => {
              this.$message({
                showClose: true,
                type: "error",
                message: err.response.data,
              });
            });
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            type: "error",
            message: err.response.data,
          });
          console.log(err.response.data);
        });
    },
    async EditStep(formData) {
      if (this.newIMG)
        await this.axios
          .post(
            `api/FAOnlineSOP/UpdateSopImage/user/${this.LoginUser.EMP_ID}/old_id/${this.stepModel.STEP_IMG.STEP_IMG_ID}`,
            formData
          )
          .then(console.log("Update IMG success!"))
          .catch((err) => {
            this.$message({
              showClose: true,
              type: "error",
              message: err.response.data,
            });
            return;
          });

      const updateModel = {
        OLD_SOP: this.stepModel.SOP_ID,
        OLD_STEP_NAME: this.oldStepName,
        STEP_DETAILS: this.stepModel,
      };
      updateModel.STEP_DETAILS.STEP_IMG.STEP_IMG_DATA = undefined;
      console.log(updateModel);
      await this.axios
        .post("api/FAOnlineSOP/UpdateSOPStep", updateModel)
        .then((res) => {
          this.$message({
            showClose: true,
            type: "success",
            message: res.data,
          });
          this.$emit("CancelEvent", true);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            type: "error",
            message: err.response.data,
          });
        });
    },
    submitForm() {
      if (!this.stepModel.STEP_NAME || !this.stepModel.STEP_CONTENTS) {
        this.$message({
          showClose: true,
          type: "error",
          message: "The information has not been entered completely",
        });
        return;
      }
      if (this.fileList.length < 1) {
        this.$message({
          showClose: true,
          type: "error",
          message: "Step Image can't be null",
        });
        return;
      }

      const file = this.fileList[0];
      const formData = new FormData();
      formData.append("file", file.raw);

      if (this.AddNew) this.NewStep(formData);
      else this.EditStep(formData);
    },
  },
};
</script>

<style></style>
