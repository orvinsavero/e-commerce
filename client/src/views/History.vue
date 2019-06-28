<template>
  <div class="container" style="display:flex;justify-content:center">
    <div style="width:1000px">
      <h3 style="font-weight:700">My History</h3>
  
            <router-link to="/cart">
                      <button class="btn btn-secondary" style="margin-top:10px" type="button">Hide</button><br>
          </router-link>
      <div class="row justify-content-start" style="margin-top:30px">
        <userCart
          :cart="cart" 
          :history="history"
          v-for="(product, i) in myCart"
          :key="i"
          :product="product"
          @showCart="readCart"
        ></userCart>
      </div>
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
      error: false,
      history: true
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
            console.log(data)
          let arr2 = [];
          data.history.forEach(x => {
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
          console.log(this.myCart)
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
    this.readCart();
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>
