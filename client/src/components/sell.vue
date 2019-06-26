<template>
  <form @submit.prevent="createProduct">
    <div id="errorCreate">
      <p class="error" style="color:red;">{{ error.create }}</p>
    </div>
    <div class="form-group">
      <label for="nameCreate">Product Name</label>
      <input
        v-model="product.name"
        type="text"
        class="form-control"
        id="nameCreate"
        placeholder="Name"
      >
    </div>
    <label for="imageCreate">Upload Image</label>
    <div id="imageCreate" class="container" style="margin-bottom: 30px">
      <div class="container">
        <picture-input
          ref="pictureInput"
          width="100"
          height="100"
          :custom-strings="{
        upload: '<h1>Bummer!</h1>',
        drag: `<img
            style='margin-right: 60px;height: 100px;width:100px;'
            src='http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Camera-Next-icon.png'
            alt='Card image cap'
          >`
      }"
        ></picture-input>
      </div>
    </div>
    <div class="form-group">
      <label for="descCreate">Description</label>
      <textarea
        v-model="product.description"
        class="form-control"
        id="descCreate"
        rows="6"
        placeholder="Description"
      ></textarea>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="priceCreate">Price</label>
        <input
          v-model="product.price"
          type="text"
          class="form-control"
          id="priceCreate"
          placeholder="Price"
        >
      </div>
      <div class="form-group col-md-6">
        <label for="quantityCreate">Quantity</label>
        <input
          v-model="product.quantity"
          type="text"
          class="form-control"
          id="quantityCreate"
          placeholder="Quantity"
        >
      </div>
    </div>
    <div class="form-group">
      <label for="categoryCreate">Category</label>
      <input
        v-model="product.category"
        type="text"
        class="form-control"
        id="categoryCreate"
        placeholder="Category"
      >
    </div>

    <button type="submit" class="btn btn-primary">Post</button>
  </form>
</template>

<script>
import PictureInput from "vue-picture-input";
const url = `http://localhost:3000`;
export default {
  name: "sell-component",
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: ""
      },
      error: {
        create: ""
      }
    };
  },
  components: {
    PictureInput
  },
  methods: {
    createProduct() {
      let newImage = new FormData();
      newImage.append("name", this.product.name);
      newImage.append("description", this.product.description);
      newImage.append("price", this.product.price);
      newImage.append("quantity", this.product.quantity);
      newImage.append("category", this.product.category);
      newImage.append("image", this.$refs.pictureInput.file);
    //   console.log(newImage);
    //   for (var data of newImage) {
    //     console.log(data);
    //   }
      axios({
        method: "POST",
        url: `${url}/product`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: newImage
      })
        .then(({ data }) => {
          console.log(data);
          this.$router.push("/mystore");
        })
        .catch(error => {
          this.error.create = error.response.data.message;
          console.log(error.response);
        });
    }
  }
};
</script>
<style>
