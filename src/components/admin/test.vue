<template>
  <div>
    <v-btn dark @click="test" :loading="loading" :disabled="loading">upload</v-btn>
    <input type="file" ref="p" @change="test2">
    <div>
      {{ ordersArray[0] }}
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import { dateParse } from "../common/utils";

export default {
  name: "test",
  data() {
    return {
      ordersArray: []
    };
  },
  methods: {
    test() {
      
    },
    test2() {
      let reader = new FileReader();
      let inputFile = this.$refs.p.files[0];
      reader.onload = event => {
        let res = event.target.result;
        const wb = XLSX.read(res, { type: "array" });
        this.ordersArray = XLSX.utils.sheet_to_json(
          wb.Sheets[wb.SheetNames[0]]
        );
        this.$store.dispatch('')
      };
      reader.readAsArrayBuffer(inputFile);
    }
  },
  computed: {
    loading() {
      this.$store.getters.loading;
    }
  }
};
</script>
<style scoped>
</style>


