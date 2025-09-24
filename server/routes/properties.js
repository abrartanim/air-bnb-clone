import express from "express";
import Property from "../models/Property.js";

const router = express.Router();

// @route   GET api/properties
// @desc    Get all properties (optimized)
// @access  Public
router.get("/", async (req, res) => {
  try {
    // FIX: Use .select() to only fetch the fields needed for the homepage cards
    const properties = await Property.find().select(
      "name price picture_url address review_scores_rating property_type"
    );
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
