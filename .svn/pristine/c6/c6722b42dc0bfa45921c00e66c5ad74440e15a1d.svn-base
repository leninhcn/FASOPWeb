<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Setting /></el-icon>
          <span>Config</span>
        </span>
      </template>
      <div class="q-pa-md">
        <q-table
          table-class="MyBodySticky"
          table-header-class="MyHeaderSticky"
          flat
          bordered
          title="Documents"
          :rows="rows"
          :columns="columns"
          row-key="ID"
          binary-state-sort
          :rows-per-page-options="[10, 20, 50, 100, 0]"
          :loading="DataLoading"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="ID" :props="props">
                {{ props.row.ID }}
              </q-td>
              <q-td key="FILE_NAME" :props="props">
                <div class="fileNameClass">
                  <span>{{ props.row.FILE_NAME }}</span>
                  <q-tooltip transition-show="scale" transition-hide="scale">
                    {{ props.row.FILE_NAME }}
                  </q-tooltip>
                </div>
                <q-popup-edit
                  v-model="props.row.FILE_NAME"
                  buttons
                  v-slot="scope"
                >
                  <q-input
                    type="textarea"
                    v-model="scope.value"
                    dense
                    autofocus
                    :rules="[FileNameRule]"
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="CONTENT_TYPE" :props="props">
                {{ props.row.CONTENT_TYPE }}
              </q-td>
              <q-td key="CONTENT_LENGTH" :props="props">
                {{ props.row.CONTENT_LENGTH }}
              </q-td>
              <q-td key="CATEGORY" :props="props">
                {{ props.row.CATEGORY }}
                <q-popup-edit v-model="props.row.CATEGORY" v-slot="scope">
                  <q-select
                    autofocus
                    filled
                    v-model="scope.value"
                    use-input
                    use-chips
                    input-debounce="0"
                    @new-value="createValue"
                    :options="filterOptions"
                    @filter="filterFn"
                    style="background-color: white"
                    @update:model-value="CategoryUpdate(scope)"
                  />
                </q-popup-edit>
              </q-td>
              <q-td key="NOTES" :props="props">
                {{ props.row.NOTES }}
              </q-td>
              <q-td key="UPDATE_TIME" :props="props">
                {{ props.row.UPDATE_TIME }}
              </q-td>
              <q-td key="UPDATE_USER" :props="props">
                {{ props.row.UPDATE_USER }}
              </q-td>
              <q-td key="ACTIONS" :props="props">
                <q-btn
                  glossy
                  rounded
                  dense
                  color="primary"
                  icon="done"
                  @click="SubmitEdit(props.row)"
                >
                  <q-tooltip transition-show="scale" transition-hide="scale">
                    Submit
                  </q-tooltip></q-btn
                >
                <q-btn
                  glossy
                  rounded
                  dense
                  color="red"
                  icon="cancel"
                  style="margin-left: 5px; margin-right: 5px"
                  @click="CancelEdit(props.row)"
                >
                  <q-tooltip transition-show="scale" transition-hide="scale">
                    Cancel
                  </q-tooltip></q-btn
                >
                <q-btn
                  glossy
                  rounded
                  dense
                  color="positive"
                  icon="refresh"
                  @click="InitData"
                >
                  <q-tooltip transition-show="scale" transition-hide="scale">
                    Refresh
                  </q-tooltip></q-btn
                >
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </el-tab-pane>
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <q-icon name="cloud_upload" />
          <span>Upload</span>
        </span>
      </template>
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        :action="upload_link"
        :auto-upload="false"
        accept="audio/*"
        v-model:file-list="UploadList"
        limit="50"
        multiple
        :on-success="UploadSuccess"
        :on-error="UploadError"
      >
        <template #trigger>
          <el-button class="btnSelect" type="primary">select file</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="UploadByEL">
          upload to server
        </el-button>

        <el-button class="ml-3" type="success" @click="ClearUploadList">
          Clear List
        </el-button>

        <template #tip>
          <div class="el-upload__tip">
            audio files with a size less than 100Mb
          </div>
        </template>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.InitData();
    this.upload_link = `${this.axios.defaults.baseURL}api/Funapp/MediaUpload`;
  },
  computed: {
    ...mapGetters({
      GetUser: "getUser",
    }),
  },
  data() {
    return {
      DataLoading: false,
      columns: [
        {
          name: "ID",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row["ID"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "FILE_NAME",
          required: true,
          label: "FILE_NAME",
          align: "left",
          field: (row) => row["FILE_NAME"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "CONTENT_TYPE",
          required: true,
          label: "CONTENT_TYPE",
          align: "left",
          field: (row) => row["CONTENT_TYPE"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "CONTENT_LENGTH",
          required: true,
          label: "CONTENT_LENGTH",
          align: "left",
          field: (row) => row["CONTENT_LENGTH"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "CATEGORY",
          required: true,
          label: "CATEGORY",
          align: "left",
          field: (row) => row["CATEGORY"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "NOTES",
          required: true,
          label: "NOTES",
          align: "left",
          field: (row) => row["NOTES"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "UPDATE_TIME",
          required: true,
          label: "UPDATE_TIME",
          align: "left",
          field: (row) => row["UPDATE_TIME"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "UPDATE_USER",
          required: true,
          label: "UPDATE_USER",
          align: "left",
          field: (row) => row["UPDATE_USER"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "ACTIONS",
          required: true,
          label: "ACTIONS",
          align: "left",
        },
      ],
      rows: [],
      OriginalRows: [],
      UploadList: [],
      upload_link: "",
      stringOptions: [],
      filterOptions: [],
    };
  },
  methods: {
    FileNameRule(val) {
      return new Promise((resolve) => {
        var forbiddenCharsRegex = /^[^\\/:*?"<>|]+$/;
        if (!forbiddenCharsRegex.test(val)) {
          resolve("Tên file không hợp lệ! Chứa các kí tự không được phép.");
        } else {
          resolve(!!val || "* Required");
        }
      });
    },
    CancelEdit(row) {
      const idx = this.rows.findIndex((it) => it.ID == row.ID);
      this.rows[idx] = { ...this.OriginalRows[idx] };
    },
    SubmitEdit(scope) {
      this.axios
        .post("api/Funapp/UpdateFileInfo", scope)
        .then((res) =>
          this.$message({
            type: "success",
            message: `Update ${res.data}`,
          })
        )
        .catch((err) => {
          this.$message({
            type: "error",
            message: err.response.data,
          });
        });
    },
    CategoryUpdate(scope) {
      if (scope.value) {
        scope.set();
      }
    },
    createValue(val, done) {
      if (val.length > 0) {
        if (!this.stringOptions.includes(val)) {
          this.stringOptions.push(val);
        }
        done(val, "toggle");
      }
    },
    filterFn(val, update) {
      update(() => {
        if (val === "") {
          this.filterOptions = this.stringOptions;
        } else {
          const needle = val.toLowerCase();
          this.filterOptions = this.stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    async InitData() {
      this.rows = [];
      this.DataLoading = true;
      await this.axios
        .get("api/Funapp/GetAllCategory")
        .then((res) => {
          this.stringOptions = res.data;
          this.filterOptions = res.data;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });

      await this.axios
        .get("api/Funapp/GetDocList?cate=all")
        .then((res) => {
          this.rows = res.data;
          this.OriginalRows = res.data.map(function (item) {
            return { ...item };
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.DataLoading = false;
    },
    submitUpload() {
      if (this.UploadList.length < 1) {
        this.$message({
          showClose: true,
          type: "error",
          message: "No file selected",
        });
        return;
      }
      const formData = new FormData();
      this.UploadList.forEach((file) => {
        formData.append("file", file.raw);
      });
      this.axios
        .post("api/Funapp/MediaUpload", formData)
        .then((res) => {
          this.$message({
            showClose: true,
            type: "success",
            message: `${res.data} + Upload success!`,
          });
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            type: "error",
            message: err.response.data,
          });
        });
    },
    ClearUploadList() {
      this.$refs.uploadRef.clearFiles();
    },
    UploadByEL() {
      if (this.UploadList.length < 1) {
        this.$message({
          showClose: true,
          type: "error",
          message: "No file selected",
        });
        return;
      }
      console.log(this.$refs.uploadRef);
      this.$refs.uploadRef.submit();
    },
    UploadSuccess(response, file) {
      this.$message({
        showClose: true,
        type: "success",
        message: `Upload success: ${file.name}`,
      });
    },
    UploadError(err) {
      const er_msg = JSON.parse(err.message);
      this.$message({
        showClose: true,
        type: "error",
        message: er_msg.Message,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.upload-demo .btnSelect {
  margin: {
    right: 10px;
  }
}

.MyBodySticky {
  th:nth-child(1),
  td:nth-child(1),
  th:nth-child(2),
  td:nth-child(2) {
    position: sticky;
    left: 0;
    z-index: 10;
    background-color: #f5f5f5;
  }
}

.fileNameClass {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>