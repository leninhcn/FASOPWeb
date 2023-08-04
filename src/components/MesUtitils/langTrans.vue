<template>
  <div class="q-pa-md">
    <q-table
      table-class="MyBodySticky"
      table-header-class="MyHeaderSticky"
      flat
      bordered
      title="Respective language"
      :rows="rows"
      :columns="columns"
      row-key="ID"
      binary-state-sort
      :rows-per-page-options="[10, 20, 50, 100, 0]"
      :loading="DataLoading"
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div style="margin-left: 15px; margin-bottom: -8px">
          <q-btn
            outline
            color="primary"
            dense
            class="glossy"
            no-caps
            label="Add new"
            @click="newlang = true"
          />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ENG" :props="props">
            {{ props.row.ENG }}
            <q-popup-edit v-model="props.row.ENG" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="EdittingConfirm(scope, props.row)"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="ZHCN" :props="props">
            {{ props.row.ZHCN }}
            <q-popup-edit v-model="props.row.ZHCN" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="EdittingConfirm(scope, props.row)"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="VNI" :props="props">
            {{ props.row.VNI }}
            <q-popup-edit v-model="props.row.VNI" v-slot="scope">
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="EdittingConfirm(scope, props.row)"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="ACTIONS" :props="props">
            <q-btn
              glossy
              rounded
              dense
              color="primary"
              icon="done"
              @click="SubmitEdit(props.row)"
              :disable="!props.row.editting"
            >
            </q-btn>
            <q-btn
              glossy
              rounded
              dense
              color="positive"
              icon="refresh"
              :disable="!props.row.editting"
              @click="InitData"
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="newlang" persistent>
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="../../assets/3898150.png" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">Application</span>
            Languages</q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <div class="q-gutter-lg">
            <q-input v-model="langModel.ENG" label="English">
              <template v-slot:append>
                <q-avatar>
                  <img src="../../assets/england2.png" />
                </q-avatar>
              </template>
            </q-input>
            <q-input v-model="langModel.VNI" label="Tiếng Việt">
              <template v-slot:append>
                <q-avatar>
                  <img src="../../assets/vietnam.png" />
                </q-avatar>
              </template>
            </q-input>
            <q-input v-model="langModel.ZHCN" label="中文">
              <template v-slot:append>
                <q-avatar>
                  <img src="../../assets/china.png" />
                </q-avatar>
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat dense label="Cancel" v-close-popup />
          <q-btn flat dense label="Submit" @click="AddNewLangTrans" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langModel: { ENG: "", ZHCN: "", VNI: "" },
      DataLoading: false,
      newlang: false,
      columns: [
        {
          name: "ENG",
          required: true,
          label: "English",
          align: "left",
          field: (row) => row["ENG"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "ZHCN",
          required: true,
          label: "Chinese",
          align: "left",
          field: (row) => row["ZHCN"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "VNI",
          required: true,
          label: "Vietnamese",
          align: "left",
          field: (row) => row["VNI"],
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "ACTIONS",
          required: true,
          label: "ACTIONS",
          align: "center",
          headerStyle: "width: 150px",
        },
      ],
      rows: [],
      OriginalRows: [],
      stringOptions: [],
      filterOptions: [],
    };
  },
  mounted() {
    this.InitData();
  },
  methods: {
    EdittingConfirm(scope, row) {
      scope.set();
      row.editting = true;
    },
    async InitData() {
      this.rows = [];
      this.DataLoading = true;
      await this.axios
        .get("api/LanguageBar/GetAll")
        .then((res) => {
          this.rows = res.data.map(function (item) {
            return { ...item, editting: false };
          });
          this.OriginalRows = res.data.map(function (item) {
            return { ...item };
          });
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
      this.DataLoading = false;
    },
    async SubmitEdit(row) {
      await this.axios
        .post("api/LanguageBar/UpdateTransLang", row)
        .then((res) => {
          this.$message({
            type: "success",
            message: res.data,
          });
          row.editting = false;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
    async AddNewLangTrans() {
      this.newlang = false;
      await this.axios
        .post("api/LanguageBar/NewLangTrans", this.langModel)
        .then((res) => {
          this.$message({
            type: "success",
            message: res.data,
          });
          this.langModel.ENG = "";
          this.langModel.ZHCN = "";
          this.langModel.VNI = "";
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.NewLangCard {
  background-color: rgb(255, 255, 255);
}
</style>