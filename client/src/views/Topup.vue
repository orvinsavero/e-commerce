<template>
<div v-if="islogin" style="margin:30px;margin-left:450px;margin-right:450px">
        <h5 class="card-title" style="margin-top:30px">Top Up</h5>
    <form @submit.prevent="addMoney">
          <div class="form-group">
    <label for="moneyInput">Input Money</label>
    <input v-model="userMoney" type="text" class="form-control" id="moneyInput" placeholder="Money">
  </div>



  <button type="submit" class="btn btn-primary">Top up</button>
</form>
    </div>

</template>

<script>
const url = `http://localhost:3000`;
export default {
  name: "top-up",
  props: ["islogin"],
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
          console.log(this.userMoney)
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
          console.log(data)
          this.$emit("showProfile")
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
  }
};
</script>
<style>
.card {
    margin-bottom: 30px;
}
</style>