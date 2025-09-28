import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import connectDB from "./lib/db.js";
import Property from "./models/Property.js";

dotenv.config();

const __dirname = path.resolve();

const importData = async () => {
  try {
    await connectDB();
    await Property.deleteMany();

    const dataPath = path.join(__dirname, "data", "listings.json");
    let listings = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    // --- Shuffle the array ---
    for (let i = listings.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listings[i], listings[j]] = [listings[j], listings[i]];
    }

    // --- Take the first 30 from the shuffled array ---
    const limitedListings = listings.slice(0, 30);

    // --- UPDATED MAPPING LOGIC FOR THE NEW FLAT SCHEMA ---
    const propertiesToInsert = limitedListings.map((item) => {
      // Clean up the price field, as it's a string in the source JSON
      const price = item.price
        ? parseFloat(item.price.replace(/[$,]/g, ""))
        : 0;

      // Return a flat object matching the new schema
      // We spread the original item and override the price field
      return {
        ...item,
        price: price,
      };
    });

    await Property.insertMany(propertiesToInsert);

    console.log("✅ Data Imported Successfully (30 random listings)!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Property.deleteMany();
    console.log("🗑️ Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error destroying data: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}