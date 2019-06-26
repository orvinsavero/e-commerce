<template>
  <div class="container" style>
    <br>
    <button
      v-on:click="checkout"
      class="btn btn-warning"
      type="button"
      style="margin-left:5px"
    >Checkout</button>

    <h3 style="margin-top:30px;color:white;opacity:0.9;font-weight:700">My Store</h3>
    <div v-if="error" style="color:red"> <p>{{ error }} </p></div>
    <div
      class="row justify-content-start"
      style="margin-top:30px;display:flex;justify-content:center"
    >
      <userCart
        :cart="cart"
        v-for="(product, i) in myCart"
        :key="i"
        :product="product"
        @showCart="readCart"
      ></userCart>
    </div>
  </div>
</template>

<script>
import userCart from "../components/card.vue";
const url = `http://localhost:3000`;
export default {
  name: "cart",
  data() {
    return {
      myCart: [],
      cart: true,
      error: false
    };
  },
  components: {
    userCart
  },
  methods: {
    readCart() {
      console.log("masuk bro");
      this.error = false
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
      console.log(total)
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
          this.readCart()
        })
        .catch(error => {
          this.error = error.response.data.message
          console.log(error);
        });
    }
  },
  created() {
    this.readCart();
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>
