const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    quantity: {
        type: Number,
    },
    price: Number,
    description: String,
    created_at: Date,
    image: String,
    category: String,
    UserId: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;