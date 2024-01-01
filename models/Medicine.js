const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: String,
  brand: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
