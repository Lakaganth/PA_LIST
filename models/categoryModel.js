const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: {
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

module.exports = mongoose.model("category", categorySchema);
