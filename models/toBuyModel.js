const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toBuyListSchema = new Schema({
  created_date: {
    type: Date,
    default: Date.now()
  },
  completed: {
    type: Boolean,
    default: false
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ]
});

module.exports = mongoose.model("toBuyList", toBuyListSchema);
