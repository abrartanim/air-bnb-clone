import express from "express";
import sharp from "sharp";
import path from "path";
import fs from "fs";


import Property from "../models/Property.js";

const router = express.Router();

// @route   GET api/properties
// @desc    Get all properties (optimized)
// @access  Public
router.get("/", async (req, res) => {
  try {
    // FIX: Use .select() to only fetch the fields needed for the homepage cards
    const properties = await Property.find().select(
      "id name price picture_url neighbourhood_cleansed review_scores_rating property_type -_id"
    );
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find a property by its custom 'id' field, not the default '_id'
    const property = await Property.findOne({ id: req.params.id });

    // If no property is found, return a 404 Not Found error
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    // If the property is found, return all its data
    res.json(property);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DO LATER
// use for optimization later
// router.get("/images/:filename", async (req, res) => {
//   const { filename } = req.params;
//   const { w, h, q } = req.query; // width, height, quality

//   const inputPath = path.join("uploads", filename); // adjust to your folder
//   if (!fs.existsSync(inputPath)) return res.status(404).send("Not found");

//   try {
//     const width = parseInt(w) || 400;
//     const height = parseInt(h) || 300;
//     const quality = parseInt(q) || 70;

//     const buffer = await sharp(inputPath)
//       .resize(width, height)
//       .jpeg({ quality })
//       .toBuffer();

//     res.type("image/jpeg").send(buffer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Image processing error");
//   }
// });

export default router;
