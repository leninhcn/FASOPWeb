<template>
  <div class="q-pa-md">
    <q-table
      table-class="MyBodySticky"
      table-header-class="MyHeaderSticky"
      flat
      bordered
      title="Languages"
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
          </q-td>
          <q-td key="ZHCN" :props="props">
            {{ props.row.ZHCN }}
          </q-td>
          <q-td key="VNI" :props="props">
            {{ props.row.VNI }}
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

    <q-dialog v-model="newlang" persistent>
      <q-card>
        <q-card-section>
            <q-btn dense round flat icon="close" v-close-popup class="absolute-top-right"/>
          <div class="text-h6">Volumes</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    async InitData() {
      this.rows = [];
      this.DataLoading = true;
      await this.axios
        .get("api/LanguageBar/GetAll")
        .then((res) => {
          this.rows = res.data;
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
  },
};
</script>

<style>
</style>