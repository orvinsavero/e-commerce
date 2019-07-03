<template>
  <div class="container" style="display:flex;justify-content:center">
    <div style="width:1000px">
      <h3 style="font-weight:700">Hacktiv-Pedia</h3>
      <div class="row justify-content-start" style="margin-top:30px;margin-left:1.5%">
        <allcard
          :store="store"
          v-for="product in allProducts"
          :key="product._id"
          :product="product"
          @showStore="filtering"
        ></allcard>
      </div>
    </div>
  </div>
</template>

<script>
import allcard from "../components/card.vue";
const url = `http://34.87.13.129:81`;
export default {
  name: "hacktiv-pedia",
  data() {
    return {
      allProducts: [],
      filterCat: [],
      store: true
    };
  },
  components: {
    allcard
  },
  methods: {
    readStore(cb) {
      axios({
        method: "GET",
        url: `${url}/product`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.allProducts = data;
          this.filterCat = this.filterTag(data);
          if (cb && this.$route.query.cat) {
            cb();
          } else if (this.$route.query.cat) {
            this.filtering();
          }
          this.$emit("showProfile", this.filterCat);
        })
        .catch(error => {
          console.log(error);
        });
    },
    filterTag(input) {
      console.log(input);
      let arr = [];
      input.forEach(product => {
        if (product.category != "") {
          if (arr.indexOf(product.category) == -1) {
            arr.push(product.category);
          }
        }
      });
      return arr;
    },
    filtering() {
      this.readStore(() => {
        let arr = [];
        this.allProducts.forEach(product => {
          if (product.category == this.$route.query.cat) {
            arr.push(product);
          }
        });
        this.allProducts = arr;
      });
    }
  },
  created() {
    localStorage.setItem("currentPage", "hacktivpedia");
    this.readStore();
  },
  watch: {
    "$route.query"() {
      console.log("watch");
      this.filtering();
    }
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>