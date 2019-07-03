<template>
  <div style="">
    <form @submit.prevent="productEdit">
          <div v-if="error.edit.length != 0" id="erroredit">
      <p class="error" style="color:red;">{{ error.edit }}</p>
    </div>
      <div class="form-group">
        <label for="editName">Product Name</label>
        <input v-model="editProduct.name" type="text" class="form-control" id="editName" required>
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
          required
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
            required
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
            required
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
          required
        >
      </div>

      <button type="submit" class="btn btn-success" style="margin-right:5px">Edit</button>
      <router-link to="/mystore">
      <button type="button" class="btn btn-danger" style="margin-left:5px">Cancel</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
const url = `http://34.87.13.129:81`;
export default {
  name: "edit-component",
  data() {
    return {
      dataLoaded: false,
      editProduct: {},
      customStrings: {},
      error: {
        edit: ""
      }
    };
  },
  components: {
    PictureInput
  },
  methods: {
    getProductId() {
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
          this.dataLoaded = true;
          this.editProduct = data[0];
          this.customStrings = {
            upload: '<h1>Bummer!</h1>',
            drag:`<img style='height: 80px;width:80px;' src='${this.editProduct.image}'alt='Card image cap'>`,
          };
        })
        .catch(error => {
          console.log(error);
        });
    },
    productEdit(){
      let newImage = new FormData();
      if (this.$refs.pictureInput.file) {
        newImage.append("image", this.$refs.pictureInput.file);
      }
      newImage.append("name", this.editProduct.name);
      newImage.append("description", this.editProduct.description);
      newImage.append("price", this.editProduct.price);
      newImage.append("quantity", this.editProduct.quantity);
      newImage.append("category", this.editProduct.category);
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
          this.$router.push("/hacktivpedia");
        })
        .catch(error => {
          this.error.edit = error.response.data.message;
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
