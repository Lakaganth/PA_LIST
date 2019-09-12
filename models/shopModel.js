const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopSchema = new Schema({
  shop_name: {
    type: String,
    required: true
  },
  shop_location: {
    type: String,
    required: true
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ]
});

module.exports = mongoose.model("shop", shopSchema);
