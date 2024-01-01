// routes/medicineRoutes.js
const express = require("express");
const router = express.Router();
const Medicine = require("../models/medicine");

// Add Medicine
router.post("/add", async (req, res) => {
  try {
    const { name, brand } = req.body;
    const medicine = new Medicine({ name, brand });
    await medicine.save();
    res.json({ success: true, medicine });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Edit Medicine
router.put("/edit/:id", async (req, res) => {
  try {
    const { name, brand } = req.body;
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, brand },
      { new: true }
    );
    res.json({ success: true, medicine });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Delete Medicine
router.delete("/delete/:id", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Medicine deleted successfully" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// List Medicines
router.get("/list", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json({ success: true, medicines });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Search Medicine
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const medicines = await Medicine.find({
      $or: [
        { name: new RegExp(query, "i") },
        { brand: new RegExp(query, "i") },
      ],
    });
    res.json({ success: true, medicines });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

module.exports = router;
