<template>
  <div style="margin:30px;margin-left:450px;margin-right:450px">
    <h5 class="card-title" style="margin-top:30px">Product Edit</h5>
    <form @submit.prevent="productEdit">
      <div class="form-group">
        <label for="editName">Product Name</label>
        <input v-model="editProduct.name" type="text" class="form-control" id="editName">
      </div>
      <label for="imageEdit">Upload Image</label>

      <div
        id="imageEdit"
        class="container"
        style="margin-bottom: 30px;display:flex;justify-content:center"
      >
        <div class="container">
          <picture-input
            v-if="dataLoaded"
            ref="pictureInput"
            width="100"
            height="100"
            :custom-strings="customStrings"
          ></picture-input>
        </div>
      </div>

      <div class="form-group">
        <label for="editDesc">Description</label>
        <textarea
          v-model="editProduct.description"
          class="form-control"
          id="editDesc"
          rows="6"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="editPrice">Price</label>
          <input
            v-model="editProduct.price"
            type="text"
            class="form-control"
            id="editPrice"
            placeholder="Price"
          >
        </div>
        <div class="form-group col-md-6">
          <label for="editQuant">Quantity</label>
          <input
            v-model="editProduct.quantity"
            type="text"
            class="form-control"
            id="editQuant"
            placeholder="Quantity"
          >
        </div>
      </div>
      <div class="form-group">
        <label for="editCategory">Category</label>
        <input
          v-model="editProduct.category"
          type="text"
          class="form-control"
          id="editCategory"
          placeholder="Category"
        >
      </div>

      <button type="submit" class="btn btn-primary" style="margin-right:5px">Edit</button>
      <router-link to="/mystore">
      <button type="button" class="btn btn-danger" style="margin-left:5px">Cancel</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
const url = `http://localhost:3000`;
export default {
  name: "hacktiv-pedia",
  data() {
    return {
      dataLoaded: false,
      error: false,
      editProduct: {},
      customStrings: {},
    };
  },
  components: {
    PictureInput
  },
  methods: {
    getProductId() {
      console.log(this.$route.params);
      axios({
        method: "GET",
        url: `${url}/product?myArticle=myProduct&search=${
          this.$route.params.id
        }`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // console.log(data[0].image);
          this.dataLoaded = true;
          this.editProduct = data[0];
          this.customStrings = {
            upload: '<h1>Bummer!</h1>',
            drag:`<img style='margin-right: 60px;width:100px;' src='${this.editProduct.image}'alt='Card image cap'>`,
          };
          // console.log(this.editProduct);
        })
        .catch(error => {
          console.log(error);
        });
    },
    productEdit(){
      console.log(this.editProduct)
      let newImage = new FormData();
      if (this.$refs.pictureInput.file) {
        newImage.append("image", this.$refs.pictureInput.file);
      }
      newImage.append("name", this.editProduct.name);
      newImage.append("description", this.editProduct.description);
      newImage.append("price", this.editProduct.price);
      newImage.append("quantity", this.editProduct.quantity);
      newImage.append("category", this.editProduct.category);
      console.log(newImage);
      for (var data of newImage) {
        console.log(data);
      }
      axios({
        method: "PATCH",
        url: `${url}/product/${this.editProduct._id}`,
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
          this.error = true;
          console.log(error.response.data.message);
        });
    }
  },
  watch: {},
  created() {
    this.getProductId()
  }
};
</script>
<style>
.card {
  margin-bottom: 30px;
}
</style>
