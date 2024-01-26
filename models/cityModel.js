// models/cityModel.js
import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  city: {
    type: String,
  },
  state_id: {
    type: String,
  },
  state_name: {
    type: String,
  },
  county_fips: {
    type: String,
  },
  county_name: {
    type: String,
  },
  lat: {
    type: String,
  },
  lng: {
    type: String,
  },
  population: {
    type: Number,
  },
  density: {
    type: Number,
  },
  timezone: {
    type: String,
  },
  ranking: {
    type: Number,
  },
  zips: {
    type: [String],
  },
  id: {
    type: String,
  },
});

const City = mongoose.model("City", citySchema);

export default City;
