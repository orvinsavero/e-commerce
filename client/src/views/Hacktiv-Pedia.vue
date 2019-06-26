<template>
  <div class="container" style>
    <h3 style="margin-top:30px;color:white;opacity:0.9;font-weight:700">Hacktiv Pedia</h3>
    <div
      class="row justify-content-start"
      style="margin-top:30px;display:flex;justify-content:center"
    >
      <allcard
        :store="store"
        v-for="product in allProducts"
        :key="product._id"
        :product="product"
        @showStore="readStore"
      ></allcard>
    </div>
  </div>
</template>

<script>
import allcard from "../components/card.vue";
const url = `http://localhost:3000`;
export default {
  name: "hacktiv-pedia",
  props: ["islogin"],
  data() {
    return {
      allProducts: [],
      store: true
    };
  },
  components: {
    allcard
  },
  methods: {
    readStore() {
      axios({
        method: "GET",
        url: `${url}/product`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.allProducts = data;
          this.$emit("showProfile")
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.readStore();
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>