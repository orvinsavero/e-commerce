<template>
  <div style="display:flex;justify-content:center;">
    <div>
    <h3 class="card-title" style="">Top Up</h3>
    <form @submit.prevent="addMoney">
      <div class="form-group">
        <label for="moneyInput">Input Money</label>
        <input
          v-model="userMoney"
          type="text"
          class="form-control"
          id="moneyInput"
          placeholder="Money"
        >
      </div>
      <button type="submit" class="btn btn-success">Top up</button>
    </form>
</div>
    
  </div>
</template>

<script>
const url = `http://34.87.13.129:81`;
export default {
  name: "top-up",
  data() {
    return {
      userMoney: ""
    };
  },
  components: {
    PictureInput
  },
  methods: {
    addMoney() {
      axios({
        method: "PATCH",
        url: `${url}/topup`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          money: this.userMoney
        }
      })
        .then(({ data }) => {
          this.userMoney = ""
          this.$emit("showProfile");
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  },
  created(){
    localStorage.setItem("currentPage", "topup")
  }
};
</script>