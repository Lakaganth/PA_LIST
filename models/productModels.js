const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true
  },
  product_category: {
    type: String,
    required: true
  },
  product_unit_price: {
    type: Number
  },
  product_inventory: {
    type: Number
  },
  product_toBuy: {
    type: Number
  },
  product_inventory_date: {
    type: Date
  },
  product_toBuy_date: {
    type: Date
  },
  product_completed: {
    type: Boolean
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  primary_shop: {
    type: Schema.Types.ObjectId,
    ref: "shop"
  },
  secondary_shop: {
    type: Schema.Types.ObjectId,
    ref: "shop"
  },
  toBuyList: {
    type: Schema.Types.ObjectId,
    ref: "toBuyList"
  }
});

module.exports = mongoose.model("product", productSchema);
