import express from "express";
import Property from "../models/Property.js";

const router = express.Router();

// @route   GET api/properties
// @desc    Get all properties
// @access  Public
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
