<template>
<div style="">
  <form @submit.prevent="createProduct" >
    <div v-if="error.create.length != 0" id="errorCreate">
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
        required
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
            style='height: 80px;width:80px;'
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
        required
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
          required
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
          required
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
        required
      >
    </div>

    <button type="submit" class="btn btn-success">Post</button>
  </form>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
const url = `http://34.87.13.129:81`;
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
      axios({
        method: "POST",
        url: `${url}/product`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: newImage
      })
        .then(({ data }) => {
          this.$router.push("/hacktivpedia");
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
