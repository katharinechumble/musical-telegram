const { Schema } = require("mongoose");

const productSchema = new Schema({
  itemId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  buyUrl: {
    type: String,
  },
  description: [
    {
      type: String,
    },
  ],
  listTag: [
    {
      type: String,
    },
  ],
});

module.exports = productSchema;
