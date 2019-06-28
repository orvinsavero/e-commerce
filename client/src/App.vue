<template>
  <div id="app">
    <mynavbar :islogin="islogin" @logout="showLogin"></mynavbar>
    <div style="display:flex">
      <router-view
        class="col-sm-9"
        style="margin-left:6%;margin-top:3%;margin-bottom:100px;box-shadow: 0px 0px 3px 0px;padding:20px;background-color:rgb(255,255,255,0.1)"
        :islogin="islogin"
        @showHome="showHome"
        @showProfile="readProfile"
      ></router-view>

      <div class="col-sm-3" v-if="islogin && myProfile.name" style="text-align:left;margin-top:3%">
        <div style="display:flex;justify-content:center;flex-direction:column">
          <div
            style="text-align:center;box-shadow: 0px 0px 3px 0px;width:200px;padding: 10px;background-color:rgb(255,255,255,0.3)"
          >
            <h3 style>My Profile</h3>
            Name: {{ myProfile.name}}
            <br>
            My Money: ${{myProfile.money}}
            <br>
            Items in Cart: {{myProfile.cart.length}}
          </div>

          <div
            style="margin-top: 15px;text-align:center;width:200px;box-shadow: 0px 0px 3px 0px;padding: 5px;background-color:rgb(255,255,255,0.3)"
          >
            <h3 style>Categories</h3>
            <br>
            <router-link
              v-for="category in categories"
              :key="category"
              :to="`/hacktivpedia?cat=${category}`"
            >
              <button
                type="submit"
                class="btn btn-success"
                style="margin-bottom:10px;width:150px"
              >{{category}}</button>
            </router-link>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mynavbar from "./components/navbar.vue";
const url = `http://localhost:3000`;
export default {
  name: "app",
  data() {
    return {
      islogin: false,
      categories: [],
      myProfile: {},
      hacktiv: false
    };
  },
  components: {
    mynavbar
  },
  methods: {
    showHome() {
      this.islogin = true;
      localStorage.setItem("currentPage", "hacktivpedia");
      this.$router.push("/hacktivpedia");
    },
    showLogin() {
      this.islogin = false;
      this.$router.push("/");
    },
    readProfile(tags) {
      axios({
        method: "GET",
        url: `${url}/cart`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.myProfile = data;
          if (tags) {
            this.categories = tags;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    console.log(localStorage.currentPage)
    if (localStorage.getItem("token")) {
      this.islogin = true
      this.showHome();
      this.readProfile();
    } else {
      this.showLogin();
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
h3 {
  color: grey;
  opacity: 0.9;
  font-weight: 700;
}
</style>