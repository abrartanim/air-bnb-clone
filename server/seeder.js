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

    // --- Add this block to shuffle the array ---
    for (let i = listings.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listings[i], listings[j]] = [listings[j], listings[i]];
    }

    // --- Now, take the first 100 from the shuffled array ---
    const limitedListings = listings.slice(0, 30);

    const propertiesToInsert = limitedListings.map((item) => {
      // Clean up the price field
      const price = item.price
        ? parseFloat(item.price.replace(/[$,]/g, ""))
        : 0;

      // Parse the amenities string into an array
      let amenities = [];
      try {
        if (item.amenities) {
          amenities = JSON.parse(item.amenities.replace(/\\u2019s/g, "'"));
        }
      } catch (e) {
        console.warn(`Could not parse amenities for listing ${item.id}`);
      }

      return {
        name: item.name,
        description: item.description,
        listing_url: item.listing_url,
        picture_url: item.picture_url,
        property_type: item.property_type,
        room_type: item.room_type,
        accommodates: item.accommodates,
        bathrooms_text: item.bathrooms_text,
        bedrooms: item.bedrooms,
        beds: item.beds,
        amenities: amenities,
        price: price,
        review_scores_rating: item.review_scores_rating,
        reviews_per_month: item.reviews_per_month,
        host: {
          host_id: item.host_id,
          host_name: item.host_name,
          host_since: item.host_since,
          host_is_superhost: item.host_is_superhost === "t",
          host_picture_url: item.host_picture_url,
        },
        address: {
          neighbourhood: item.neighbourhood_cleansed,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        },
      };
    });

    await Property.insertMany(propertiesToInsert);

    console.log("✅ Data Imported Successfully (100 random listings)!");
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
