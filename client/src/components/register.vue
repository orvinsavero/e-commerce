<template>
      <div class="col" style="">
        <h5 class="card-title" style>Register</h5>
        <form @submit.prevent="userRegister">
          <div class="form-group">
            <label for="registerName">Name</label>
            <input v-model="register.name" type="text" class="form-control" id="registerName" placeholder="Name">
          </div>
          <div class="form-group">
            <label for="registerEmail">Email</label>
            <input v-model="register.email" type="email" class="form-control" id="registerEmail" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="registerPassword">Password</label>
            <input v-model="register.password"
              type="password"
              class="form-control"
              id="registerPassword"
              placeholder="Password"
            >
          </div>
          <div id="errorRegister">
            <p class="error" style="color:red;">{{ error.register }}</p>
          </div>
          <button type="submit" class="btn btn-success">Register</button>
        </form>
      </div>
</template>

<script>
const url = `http://localhost:3000`;
export default {
  name: "register",
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: ""
      },
      error: {
        register: ""
      },
      success: {
        register: ""
      }
    };
  },
  components: {},
  methods: {
    clearAll() {
      this.register.name = "";
      this.register.email = "";
      this.register.password = "";
      this.error.register = "";
    },
    userRegister() {
      axios({
        method: "POST",
        url: `${url}/register`,
        data: {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(result => {
          this.clearAll();
        })
        .catch(error => {
          this.error.register = `${error.response.data.message}`;
        });
    },
    showHome() {
      this.$emit("showHome");
    }
  }
};
</script>
