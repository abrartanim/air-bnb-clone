import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String], // An array of image URLs
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      city: String,
      country: String,
    },
    guests: {
      type: Number,
      default: 1,
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    beds: {
      type: Number,
      default: 1,
    },
    baths: {
      type: Number,
      default: 1,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    amenities: [String], // An array of amenities like "Wifi", "Pool", etc.
    host: {
      name: String,
      avatar: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;
