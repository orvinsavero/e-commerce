<template>
      <div class="col" style="">
        <h5 class="card-title" style>Login</h5>
        <form @submit.prevent="userLogin">
          <div class="form-group">
            <label for="loginEmail">Email</label>
            <input v-model="login.email" type="email" class="form-control" id="loginEmail" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="loginPassword">Password</label>
            <input v-model="login.password" type="password" class="form-control" id="loginPassword" placeholder="Password">
          </div>
          <div id="errorLogin">
            <p class="error" style="color:red;">{{ error.login }}</p>
          </div>
          <button type="submit" class="btn btn-success">Login</button>
        </form>
      </div>

</template>

<script>
const url = `http://34.87.13.129:81`;
export default {
  name: "login",
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      error: {
        login: ""
      },
    };
  },
  components: {},
  methods: {
    clearAll() {
      this.login.email = "";
      this.login.password = "";
      this.error.login = "";
    },
    userLogin() {
      axios({
        method: "POST",
        url: `${url}/login`,
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("auth", data.auth);
          console.log(data)
          console.log(localStorage)
          this.clearAll();
          this.showHome();
        })
        .catch(error => {
          this.error.login = `${error.response.data.message}`;
        });
    },
    showHome() {
      this.$emit("showHome");
    }
  }
};
</script>
