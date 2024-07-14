const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: { type: String, required: true },
  message: {type: String, required: true},
  added: { type: Date, default: Date.now }
});

// Virtual for message's URL
messageSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/message/${this._id}`;
});

// Export model
module.exports = mongoose.model("Message", messageSchema);
