import express from "express";
import fs from "fs";
import City from "../models/cityModel.js";
const router = express.Router();

// Get a single city
router.get("/:state_name", async (req, res) => {
  try {
    const city = await City.findOne({ state_name: req.params.state_name });
    if (!city) {
      return res.status(404).json({ message: "city not found" });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:state_name/:city", async (req, res) => {
  try {
    const city = await City.findOne({
      state_name: req.params.state_name,
      city: req.params.city,
    });
    if (!city) {
      return res.status(404).json({ message: "city not found" });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // Extract page and limit from query parameters or use default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Calculate the skip value based on the page number and limit
    const skip = (page - 1) * limit;

    // Specify the fields you are interested in
    const selectedFields = ["city", "state_name"];

    // Fetch cities with pagination and selected fields
    const cities = await City.find()
      .skip(skip)
      .limit(limit)
      .select(selectedFields);

    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const rawData = fs.readFileSync("data.json");
//     const citiesData = JSON.parse(rawData);

//     citiesData.forEach(async (cityData) => {
//       try {
//         const city = new City(cityData);
//         await city.save();
//       } catch (error) {
//         console.error(`Error saving city ${cityData.city}: ${error.message}`);
//       }
//     });

//     res.status(201).json({ ssaved: true });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

export default router;
