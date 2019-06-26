<template>
  <div class="col-4">
    <div class="card" style="width: 18rem;">
      <h5 class="card-title" style="margin-top:30px">{{ product.name }}</h5>
      <div
        style="height: 250px; width: 100%; display:flex;align-items:center;justify-content:center"
      >
        <div>
          <img
            style="max-width:100%;height:auto;width:auto;max-height:250px"
            class="card-img-top"
            v-bind:src="product.image"
            alt="Card image cap"
          >
        </div>
      </div>
      <div class="card-body">
        <p class="card-text">Category: {{ product.category }}</p>
        <p class="card-text">Price: ${{ product.price }}</p>
        <p v-if="!cart" class="card-text">Quantity: {{ product.quantity }}</p>
        <p v-if="cart" class="card-text">Total Items: {{ product.count }}</p>
        <p>
          <button
            v-if="!cart"
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            v-bind:data-target="`#${product._id}`"
            aria-expanded="false"
            aria-controls="collapseExample"
          >Detail</button>
          <router-link :to="`/edit/${product._id}`">
            <button
              v-if="myStore"
              class="btn btn-secondary"
              type="button"
              style="margin-left:5px"
            >Edit</button>
          </router-link>
          <button
            v-if="store"
            class="btn btn-secondary"
            type="button"
            @click="addToCart(product._id)"
            style="margin-left:5px"
          >Add to cart</button>
          <button
            v-if="myStore"
            class="btn btn-danger"
            type="button"
            @click="deleteProduct(product._id)"
            style="margin-left:5px"
          >Delete</button>
          <button
            @click="removeFromCart(product._id)"
            v-if="cart"
            class="btn btn-danger"
            type="button"
            style="margin-left:5px"
          >Remove from cart</button>
        </p>
        <div v-if="!cart" class="collapse" v-bind:id="product._id">
          <p class="card-text">
            <small class="text-muted">Seller: {{ product.UserId.name }}</small>
          </p>
          <div class="card card-body">
            {{ product.description }}
            <br>

            <p class="card-text">
              <small class="text-muted">Created at {{ product.created_at }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const url = `http://localhost:3000`;
export default {
  name: "my-store",
  props: ["product", "myStore", "store", "cart"],
  data() {
    return {
      outofstock: false
    };
  },
  components: {},
  created() {
    this.outofstock = false;
  },
  methods: {
    removeFromCart(productId) {
      let newQ = this.product.quantity + this.product.count;
      axios({
        method: "PATCH",
        url: `${url}/product/${productId}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          quantity: newQ
        }
      })
        .then(({ data }) => {
          return axios({
            method: "PATCH",
            url: `${url}/cart/remove/${productId}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
        })
        .then(({ data }) => {
          this.$emit("showCart");
        })
        .catch(error => {
          this.outofstock = true;
          console.log(error.response.data);
        });
    },
    deleteProduct(productId) {
      axios({
        method: "DELETE",
        url: `${url}/product/${productId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("showMyStore");
        })
        .catch(error => {
          console.log(error.response.data);
        });
    },
    addToCart(productId) {
      let newQ = this.product.quantity - 1;
      axios({
        method: "PATCH",
        url: `${url}/product/${productId}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          quantity: newQ
        }
      })
        .then(({ data }) => {
          return axios({
            method: "PATCH",
            url: `${url}/cart/${productId}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
        })
        .then(({ data }) => {
          console.log(data);
          this.$emit("showStore");
        })
        .catch(error => {
          this.outofstock = true;
          console.log(error.response.data);
        });
    }
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>