<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a v-if="!islogin" class="navbar-brand" style="cursor:pointer;color:#696969">Hacktiv-Pedia</a>
    <router-link v-if="islogin" to="/hacktivpedia">
      <a class="navbar-brand" style="cursor:pointer;color:#696969">Hacktiv-Pedia</a>
    </router-link>
    <button class="navbar-toggler" type="button"></button>

    <div v-if="islogin" class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/mystore">
            <a class="nav-link" style="cursor:pointer">My Store</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sell">
            <a class="nav-link active" style="cursor:pointer">Sell</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/topup">
            <a class="nav-link active" style="cursor:pointer">Top Up</a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cart">
            <a class="nav-link active" style="cursor:pointer">Cart</a>
          </router-link>
        </li>
      </ul>
      <router-link to="/">
        <button class="btn btn-outline-secondary" type="submit" v-on:click="logout">Logout</button>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  props: ["islogin"],
  data() {
    return {};
  },
  created() {},
  methods: {
    showHome() {
      this.$emit("showHome");
    },
    showArticle() {
      this.$emit("showArticle");
    },
    showCreate() {
      this.$emit("showCreate");
    },
    logout() {
      localStorage.clear();
      this.$emit("logout");
    }
  }
};
</script>