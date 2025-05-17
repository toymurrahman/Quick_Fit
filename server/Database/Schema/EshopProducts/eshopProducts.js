const { default: mongoose } = require("mongoose");

const eshopProductSchema = new mongoose.Schema({
  category: String,
  date: String,
  title: String,
  subTitle: String,
  image: String,
  features: [String],
  price: Number,
});

module.exports = mongoose.model(
  "eshopProduct",
  eshopProductSchema,
);