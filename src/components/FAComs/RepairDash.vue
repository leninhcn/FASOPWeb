<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <div class="header">
          <div class="ReaportTitle">{{ rpTitle }}</div>
          <div class="row">
            <div
              style="padding-top: 20px; text-align: left; margin-left: 10px"
              class="col-9"
            >
              Start Time: 2024/01/01 00:00:00
            </div>
            <div class="col">
              <q-select
                v-model="currentModel"
                :options="models"
                label="Model"
                dense
                @update:model-value="ChangeModel"
                style="min-width: 80px"
              ></q-select>
            </div>
            <div class="col">
              <q-btn
                flat
                dense
                round
                color="secondary"
                icon="sync"
                style="margin-top: 10px; margin-left: 10px"
                @click="ReloadData"
              />
            </div>
          </div>
        </div>
        <div class="divRateDetails">
          <table>
            <thead>
              <tr>
                <th>Duration</th>
                <th>Checkin</th>
                <th>Checkout</th>
                <th>Wip</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, id) in rateDtRows"
                :key="id"
                @click="Rowclick(row)"
              >
                <td>{{ row.Duration }}</td>
                <td>{{ row.CheckInQty }}</td>
                <td>{{ row.RepairedQty }}</td>
                <td>{{ row.UnRepairedQty }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col">
        <div style="min-width: 550px">
          <WipPie ref="pieChart"></WipPie>
        </div>
      </div>
    </div>
    <div class="row tabSN">
      <div class="col-5">
        <div class="divSnDetails">
          <q-table
            :title="tbTitle"
            :rows="SNs"
            row-key="name"
            flat
            style="height: 60vh; margin-bottom: 30px"
            virtual-scroll
            :pagination="initialPagination"
          >
            <template v-slot:top-right>
              <div class="row">
                <div class="col">
                  <q-select
                    v-model="snStatus"
                    :options="RPStatus"
                    label="Status"
                    dense
                    @update:model-value="ChangeStatus"
                    style="min-width: 80px"
                  ></q-select>
                </div>
                <div class="col">
                  <q-btn
                    flat
                    dense
                    round
                    color="secondary"
                    icon="download"
                    style="margin-top: 10px; margin-left: 15px"
                    @click="ExportData"
                  />
                </div>
              </div>
            </template>
          </q-table>
          <q-inner-loading :showing="tbLoading">
            <q-spinner-ball size="70px" color="deep-orange" />
          </q-inner-loading>
        </div>
      </div>
      <div class="col">
        <div style="min-width: 550px; margin-top: 20px">
          <WipBar ref="barChart"></WipBar>
        </div>
      </div>
    </div>
    <q-inner-loading :showing="dataLoading">
      <q-spinner-ball size="80px" color="deep-orange" />
    </q-inner-loading>
  </div>
</template>

<script>
import WipPie from "./RateChart/piechart.vue";
import WipBar from "./RateChart/barchart.vue";
import * as xlsx from "xlsx";
export default {
  mounted() {
    const ssModel = sessionStorage.getItem("FAkanbanModel");
    if (ssModel && ssModel.length > 2) {
      this.currentModel = ssModel;
      this.ChangeModel(this.currentModel);
    }    
    this.GetModel();
  },
  components: {
    WipPie,
    WipBar,
  },
  data() {
    return {
      rpTitle: "FA WIP",
      tbLoading: false,
      rateDtRows: [
        {
          Duration: "24H",
          CheckInQty: 0,
          RepairedQty: 0,
          UnRepairedQty: 0,
        },
        {
          Duration: "48H",
          CheckInQty: 0,
          RepairedQty: 0,
          UnRepairedQty: 0,
        },
        {
          Duration: "72H",
          CheckInQty: 0,
          RepairedQty: 0,
          UnRepairedQty: 0,
        },
        {
          Duration: ">72H",
          CheckInQty: 0,
          RepairedQty: 0,
          UnRepairedQty: 0,
        },
      ],
      snDetails: [],
      SNs: [],
      qtbColumns: [],
      models: ["ER002", "ER003", "ER004"],
      snStatus: "All",
      RPStatus: ["All", "Repaired", "Wip"],
      currentModel: "None",
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: xx if getting data from a server
      },
      tbTitle: "Defect List",
      dataLoading: false,
    };
  },
  methods: {
    GetModel() {
      this.axios
        .get("api/FAReport/GetModel")
        .then((res) => {
          this.models = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ChangeStatus(stt) {
      switch (stt) {
        case "All":
          this.SNs = this.snDetails;
          break;
        case "Repaired":
          this.SNs = this.snDetails.filter(
            (item) => item.OUT_REPAIR_TIME != null
          );
          break;
        case "Wip":
          this.SNs = this.snDetails.filter(
            (item) => item.OUT_REPAIR_TIME == null
          );
          break;
        default:
          this.SNs = this.snDetails;
          break;
      }
    },
    ExportData() {
      const workbook = xlsx.utils.book_new();

      // Chuyển đổi mảng thành một bảng dữ liệu
      const worksheet = xlsx.utils.json_to_sheet(this.SNs);

      // Thêm bảng dữ liệu vào workbook
      xlsx.utils.book_append_sheet(workbook, worksheet, "Data");

      // Tạo một tệp Excel
      const excelFileName = "fawip.xlsx";
      xlsx.writeFile(workbook, excelFileName);
    },
    Rowclick(row) {
      if (this.currentModel != "None" && !this.tbLoading)
        this.GetSNList(this.currentModel, row.Duration);
    },
    GetSNList(model, duration) {
      this.tbLoading = true;
      this.tbTitle = `Defect List (${duration})`;
      this.axios
        .get(`api/FAReport/GetRepairList?model=${model}&duration=${duration}`)
        .then((res) => {
          if (res.status == 200) {
            this.snDetails = res.data;
            this.ChangeStatus(this.snStatus);
          } else
            this.$message({
              showClose: true,
              type: "error",
              message: res.data,
            });
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            type: "error",
            message: JSON.stringify(err),
          });
        })
        .finally(() => {
          this.tbLoading = false;
        });
    },
    ReloadData() {
      if (!this.currentModel.includes("None") && !this.dataLoading) {
        this.ChangeModel(this.currentModel);
      }
    },
    ChangeModel(model) {
      this.dataLoading = true;
      sessionStorage.setItem("FAkanbanModel", model);
      this.rpTitle = `${model} FA WIP`;
      this.SNs = [];
      this.axios
        .get(`api/FAReport/GetWip?model=${model}`)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.rateDtRows = res.data;
            for (let index = 0; index < this.rateDtRows.length; index++) {
              if (this.rateDtRows[index].CheckInQty > 0) {
                this.GetSNList(model, this.rateDtRows[index].Duration);
                break;
              }
            }
            this.$refs.pieChart.DataUpdate(this.rateDtRows);
            this.$refs.barChart.DataUpdate(this.rateDtRows);
          } else
            this.$message({
              showClose: true,
              type: "error",
              message: res.data,
            });
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            type: "error",
            message: err.message,
          });
        })
        .finally(() => (this.dataLoading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.ReaportTitle {
  font-size: 3em;
  font-style: oblique;
  color: blue;
  font-weight: bold;
  margin: {
    top: 10px;
    bottom: 20px;
  }
}
.tabSN {
  margin: {
    top: 10px;
  }
}

.container {
  position: relative;
  width: 103%;
  background-color: rgb(232, 247, 247);
  margin: {
    top: -20px;
    left: -20px;
  }
  padding: {
    left: 10px;
  }
}
.divRateDetails {
  padding: 5px;
  table {
    width: 100%;
    margin-top: 10px;
    height: 100%;
  }
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th {
    color: blue;
  }
  tr:nth-child(even) {
    background-color: #d6eeee;
  }
  tbody tr:hover {
    background-color: #9ffcfc;
  }
}
.divSnDetails {
  padding: 5px;
  position: relative;
}
</style>
