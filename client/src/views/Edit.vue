<template>
  <div style="display:flex;justify-content:center;flex-direction:column;width:300px">
    <h3 class="card-title">Product Edit</h3>
    <edit class="row align-self-center"></edit>
  </div>
</template>

<script>
import edit from "../components/edit.vue";
export default {
  name: "edit-view",
  data() {
    return {

    };
  },
  components: {
    edit
  },
  methods: {
  },
  watch: {},
  created() {
  }
};
</script>
