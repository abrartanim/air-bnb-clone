import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import Property from "./models/Property.js";
import { properties } from "./data/seedData.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Property.deleteMany();

    // Insert new data
    await Property.insertMany(properties);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Property.deleteMany();

    console.log("Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
