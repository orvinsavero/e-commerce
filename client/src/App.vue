<template>
  <div id="app">
    <mynavbar :islogin="islogin" @logout="showLogin"></mynavbar>
    <div v-if="myProfile.name" style="align-text:center"> 
      <h3 style="margin-top:30px;color:white;opacity:0.9;font-weight:700">My Profile</h3>
      {{ myProfile.name}} <br>
      My Money: $ {{myProfile.money}}
      <br>Items in Cart: {{myProfile.cart.length}}
    </div>
    <router-view :islogin="islogin" @showHome="showHome" @showProfile="readProfile"></router-view>
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
      readAll: false,
      create: false,
      edit: false,
      readMy: false,
      myProfile: {}
    };
  },
  components: {
    mynavbar
  },
  methods: {
    showHome() {
      localStorage.setItem("currentPage", "readAll");
      this.$router.push("/hacktivpedia");
      this.islogin = true;
    },
    showCreate() {
      localStorage.setItem("currentPage", "create");
      this.islogin = true;
      this.home = false;
      this.create = true;
      this.edit = false;
      this.articleStats = false;
    },
    showEdit(articleEdit) {
      localStorage.setItem("currentPage", "edit");
      this.islogin = true;
      this.home = false;
      this.create = false;
      this.articleStats = false;
      this.edit = true;
      this.editSelect = articleEdit;
    },
    showArticle() {
      localStorage.setItem("currentPage", "articleStats");
      this.islogin = true;
      this.home = false;
      this.create = false;
      this.articleStats = true;
      this.edit = false;
      this.readMyArticle();
    },
    showLogin() {
      localStorage.setItem("currentPage", "login");
      this.$router.push("/");
      this.islogin = false;
    },
    readProfile() {
      axios({
        method: "GET",
        url: `${url}/cart`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.myProfile = data
          console.log(data)
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.readProfile()
      this.islogin = true;
      if (localStorage.currentPage == "readAll") {
        this.showHome();
      } else if (localStorage.currentPage == "articleStats") {
        this.showArticle();
      } else if (localStorage.currentPage == "create") {
        this.showCreate();
      } else {
        this.showArticle();
      }
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
</style>