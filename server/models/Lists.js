const { Schema } = require("mongoose");

const listSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
});

module.exports = listSchema;
