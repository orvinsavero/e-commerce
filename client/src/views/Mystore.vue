<template>
  <div class="container" style="">
    <h3 style="margin-top:30px;color:white;opacity:0.9;font-weight:700">My Store</h3>
    <div class="row justify-content-start" style="margin-top:30px;display:flex;justify-content:center">
      <mycard :myStore="myStore" v-for="product in myProducts" :key="product._id" :product="product"></mycard>
    </div>
  </div>
</template>

<script>
import mycard from "../components/card.vue";
const url = `http://localhost:3000`;
export default {
  name: "mystore",
    data() {
    return {
      myProducts: [],
      myStore: true
    };
  },
  components: {
    mycard
  },
  methods: {
    readMyStore() {
      axios({
        method: "GET",
        url: `${url}/product?myArticle=myProduct`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.myProducts = data
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.readMyStore()
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>


