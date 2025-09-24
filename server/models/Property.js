import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    listing_url: { type: String, required: true },
    picture_url: { type: String, required: true },
    property_type: { type: String, required: true },
    room_type: { type: String, required: true },
    accommodates: { type: Number, required: true },
    bathrooms_text: { type: String },
    bedrooms: { type: Number },
    beds: { type: Number },
    amenities: { type: [String] },
    price: { type: Number, required: true },
    review_scores_rating: { type: Number },
    reviews_per_month: { type: Number },
    host: {
      host_id: Number,
      host_name: String,
      host_since: Date,
      host_is_superhost: Boolean,
      host_picture_url: String,
    },
    address: {
      neighbourhood: String,
      latitude: Number,
      longitude: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", PropertySchema);

export default Property;
