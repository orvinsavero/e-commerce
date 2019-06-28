<template>
  <div style="display:flex;justify-content:center;flex-direction:column;width:300px">
    <h3 class="card-title">Sell Product</h3>
    <sellpage class="row align-self-center"></sellpage>
  </div>
</template>

<script>
import sellpage from "../components/sell.vue";

export default {
  name: "sell-page",
  components: {
    sellpage
  },
  created() {
    localStorage.setItem("currentPage", "sell");
  }
};
</script>