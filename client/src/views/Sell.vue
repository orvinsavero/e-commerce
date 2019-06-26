<template>
  <div style="margin:30px;margin-left:450px;margin-right:450px">
    <h5 class="card-title" style="margin-top:30px">Product Detail</h5>
    <sellpage></sellpage>
  </div>
</template>

<script>
import sellpage from "../components/sell.vue";

export default {
  name: "sell-page",
  components: {
    sellpage
  }
};
</script>