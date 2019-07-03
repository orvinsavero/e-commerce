<template>
  <div class="container" style="display:flex;justify-content:center">
    <div style="width:1000px">
      <h3 style="font-weight:700">My Cart</h3>
      <router-link to="/cart/history">
        <button class="btn btn-success" style="margin-top:10px" type="button">My History</button>
        <br>
      </router-link>

      <p v-if="total.length != 0" style="margin-top:10px">Total in cart: ${{ total }}</p>
      <button
        v-on:click="checkout"
        class="btn btn-warning"
        style="margin-top:10px"
        type="button"
      >Checkout</button>

      <div v-if="error" style="color:red;margin-top:10px">
        <p>{{ error }}</p>
      </div>
      <div class="row justify-content-start" style="margin-top:30px;margin-left:1.5%">
        <userCart
          :cart="cart"
          v-for="(product, i) in myCart"
          :key="i"
          :product="product"
          @showCart="readCart"
        ></userCart>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import userCart from "../components/card.vue";
const url = `http://34.87.13.129:81`;
export default {
  name: "cart",
  data() {
    return {
      myCart: [],
      cart: true,
      error: false,
      total: ""
    };
  },
  components: {
    userCart
  },
  methods: {
    readCart() {
      this.error = false;
      axios({
        method: "GET",
        url: `${url}/cart`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          let arr2 = [];
          data.cart.forEach(x => {
            let obj = {
              _id: x._id,
              name: x.name,
              image: x.image,
              category: x.category,
              quantity: x.quantity,
              price: x.price
            };
            arr2.push(obj);
          });

          let arr = [];
          let arr3 = [];
          arr2.forEach(x => {
            if (arr3.indexOf(x._id) == -1) {
              arr3.push(x._id);
              let temp = x;
              temp.count = 1;
              arr.push(temp);
            } else {
              let index = arr3.indexOf(x._id);
              arr[index].count++;
            }
          });
          let total1 = 0;
          console.log(arr);
          arr.forEach(x => {
            total1 += x.count * x.price;
          });
          this.total = total1;
          this.myCart = arr;
          this.$emit("showProfile");
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkout() {
      let total = 0;
      this.myCart.forEach(x => {
        total += x.count * x.price;
      });
      axios({
        method: "PATCH",
        url: `${url}/cart`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          money: total
        }
      })
        .then(result => {
          this.readCart();
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    }
  },
  created() {
    localStorage.setItem("currentPage", "cart");
    this.readCart();
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>
