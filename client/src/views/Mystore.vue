<template>
  <div class="container" style="display:flex;justify-content:center">
    <div style="width:1000px">
    <h3 style="font-weight:700">My Store</h3>
    <p v-if="myProducts.length == 0"> Your store is empty!</p>
    <div class="row justify-content-start" style="margin-top:30px;margin-left:1.5%">
      <mycard :myStore="myStore" v-for="product in myProducts" :key="product._id" :product="product" @showMyStore="readMyStore"></mycard>
    </div>
    </div>
  </div>
</template>

<script>
import mycard from "../components/card.vue";
const url = `http://34.87.13.129:81`;
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
        url: `${url}/product?myProduct=myProduct`,
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
          localStorage.setItem("currentPage", "mystore");
    this.readMyStore()
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>


