<template>
  <div v-if="!islogin" class="container">
    <h1 style="margin-bottom: 70px">Hacktiv-Pedia</h1>
    <div class="row">
      <registerpage></registerpage>
      <loginpage @showHome="showHome"></loginpage>
    </div>
  </div>
</template>

<script>
import loginpage from "../components/login.vue";
import registerpage from "../components/register.vue";
const url = `http://localhost:3000`;
export default {
  name: "login-register",
  props: ["islogin"],
  data() {
    return {
    };
  },
  components: {
    loginpage,
    registerpage
  },
  methods: {
    showHome() {
      this.$emit("showHome");
    }
  }
};
</script>
