const { Schema } = require("mongoose");

const productSchema = new Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> bad9e854d2eb8b229ad75720face6b9800bd424e
});

module.exports = productSchema;
