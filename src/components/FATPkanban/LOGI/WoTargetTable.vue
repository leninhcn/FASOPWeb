<!-- eslint-disable no-unused-vars -->
<template>
  <div class="wo-table">
    <div class="table-container">
      <table border="1">
        <tr>
          <td>Line</td>
          <td colspan="5" class="table-info">{{ pdlineASSY }}</td>
        </tr>
        <tr>
          <td>Model</td>
          <td colspan="5" class="table-info">
            {{ model.name }}
            {{ model.modelName }}
          </td>
        </tr>
        <tr>
          <td>WorkOrder</td>
          <td colspan="5" class="table-info">{{ WOASSY }}</td>
        </tr>
        <tr>
          <td>ICT PN</td>
          <td colspan="2" class="table-info">{{ ictPNASSY }}</td>
          <td style="min-width: 100px">LOGI PN</td>
          <td colspan="2" class="table-info">
            <input class="table-info input" type="text" v-model="logiPNASSY" />
          </td>
        </tr>
        <tr>
          <td style="width: 15vw">WorkOrder Target</td>
          <td class="table-info">{{ targetQtyASSY }}</td>
          <td>Assy</td>
          <td class="table-info">{{ packedQtyASSY }}</td>
          <td>Progress</td>
          <td class="table-info">{{ yieldRateASSY }}%</td>
        </tr>
      </table>
    </div>
    <div class="table-container">
      <table border="1">
        <tr>
          <td>Line</td>
          <td colspan="5" class="table-info">{{ pdlinePacking }}</td>
        </tr>
        <tr>
          <td>Model</td>
          <td colspan="5" class="table-info">
            {{ model.name }} {{ model.modelName }}
          </td>
        </tr>
        <tr>
          <td>WorkOrder</td>
          <td colspan="5" class="table-info">{{ WOPacking }}</td>
        </tr>
        <tr>
          <td>ICT PN</td>
          <td colspan="2" class="table-info">{{ ictPNPacking }}</td>
          <td style="min-width: 100px">LOGI PN</td>
          <td colspan="2" class="table-info">
            <input
              class="table-info input"
              type="text"
              v-model="logiPNPacking"
            />
          </td>
        </tr>
        <tr>
          <td style="width: 15vw">WorkOrder Target</td>
          <td class="table-info">{{ targetQtyPacking }}</td>
          <td>Packed</td>
          <td class="table-info">{{ packedQtyPacking }}</td>
          <td>Progress</td>
          <td class="table-info">{{ yieldRatePacking }}%</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: "N/A",

      pdlineASSY: "N/A",
      WOASSY: "N/A",
      targetQtyASSY: "N/A",
      packedQtyASSY: "N/A",
      yieldRateASSY: "N/A",

      pdlinePacking: "N/A",
      WOPacking: "N/A",
      targetQtyPacking: "N/A",
      packedQtyPacking: "N/A",
      yieldRatePacking: "N/A",

      ictPNASSY: "N/A",
      ictPNPacking: "N/A",
      logiPNASSY: "N/A",
      logiPNPacking: "N/A",
    }
  },

  methods: {
    DataUpdate(model) {
      this.model = model
      try {
        this.model.stage = "PACKING"
        this.axios
          .post("api/FATPKanban/LOGI/GetWoTargetLOGI", model)
          .then((res) => {
            console.log(res)
            if (res.data.status == "OK" && res.data.data[0].TARGET_QTY != "") {
              this.pdlinePacking =
                res.data.data[0].PDLINE_NAME || `${model.name} Packing Line 1`
              this.WOPacking = res.data.data[0].WORK_ORDER
              this.targetQtyPacking = res.data.data[0].TARGET_QTY
              this.packedQtyPacking = res.data.data[0].OUTPUT_QTY
              this.yieldRatePacking = res.data.data[0].PERCENT
              this.ictPNPacking = res.data.data[0].ICT_PN
            }
          })
          .catch((err) => {
            console.log(err)
          })

        this.model.stage = "ASSY"
        this.axios
          .post("api/FATPKanban/LOGI/GetWoTargetLOGI", model)
          .then((res) => {
            if (res.data.status == "OK" && res.data.data[0].TARGET_QTY != "") {
              this.pdlineASSY =
                res.data.data[0].PDLINE_NAME || `${model.name} Assy Line 1`
              this.WOASSY = res.data.data[0].WORK_ORDER
              this.targetQtyASSY = res.data.data[0].TARGET_QTY
              this.packedQtyASSY = res.data.data[0].OUTPUT_QTY
              this.yieldRateASSY = res.data.data[0].PERCENT
              this.ictPNASSY = res.data.data[0].ICT_PN
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.wo-table {
  width: 100%; /* Chiều rộng của div là 50% của màn hình */
  height: auto; /* Chiều cao của div là 30% của màn hình */
  overflow: auto;
  display: flex;
  justify-content: center;
}
.table-container {
  margin-top: 3vh;
  display: flex;
  align-content: center;
  justify-content: center;
}

table {
  width: 90%; /* Bảng chiếm toàn bộ chiều rộng của div */
  border-collapse: collapse;
  font-weight: 600;
  font-size: 17px;
}

td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

.table-info {
  color: blue;
}

.input {
  border-style: none;
  background-color: transparent;
}
</style>
