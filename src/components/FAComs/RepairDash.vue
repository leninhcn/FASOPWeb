<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <div class="header">
          <div class="ReaportTitle">FA WIP</div>
          <div class="row">
            <div
              style="padding-top: 20px; text-align: left; margin-left: 10px"
              class="col-10"
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
              ></q-select>
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
                <td>{{ row.duration }}</td>
                <td>{{ row.checkinQty }}</td>
                <td>{{ row.checkoutQty }}</td>
                <td>{{ row.checkinQty - row.checkoutQty }}</td>
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
            title="SN Details"
            :rows="snDetails"
            :columns="columns"
            row-key="name"
          />
        </div>
      </div>
      <div class="col">
        <div style="min-width: 550px">
          <WipBar ref="barChart"></WipBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WipPie from "./RateChart/piechart.vue";
import WipBar from "./RateChart/barchart.vue";
export default {
  mounted() {
    console.log("chan lam co");
  },
  components: {
    WipPie,
    WipBar,
  },
  data() {
    return {
      rateDtRows: [
        {
          duration: "24h",
          checkinQty: 100,
          checkoutQty: 40,
        },
        {
          duration: "48h",
          checkinQty: 300,
          checkoutQty: 120,
        },
        {
          duration: "72h",
          checkinQty: 500,
          checkoutQty: 340,
        },
        {
          duration: ">72h",
          checkinQty: 1500,
          checkoutQty: 1340,
        },
      ],
      snDetails: [
        {
          serial_number: "SN1",
          Error_code: "Error001",
          checkin_time: "checkinTime",
          checkout_time: "checkoutTime",
          repair_emp: "91023991",
          repair_method: "dap bo",
        },
      ],
      qtbColumns: [],
      models: ["ER002", "ER003", "ER004"],
      currentModel: "None",
    };
  },
  methods: {
    Rowclick(row) {
      console.log(row);
    },
    ChangeModel(model) {
      console.log(model);
      this.$refs.pieChart.DataUpdate();
      this.$refs.barChart.DataUpdate();
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
}
</style>
