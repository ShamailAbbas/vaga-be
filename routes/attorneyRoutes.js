// routes/attorneyRoutes.js
import express from "express";
import Attorney from "../models/attornyModel.js";

const router = express.Router();

// Create an attorney
router.post("/", async (req, res) => {
  try {
    const attorneyData = req.body;
    console.log(attorneyData);
    const newAttorney = new Attorney(attorneyData);
    console.log("newAttorney is ", newAttorney);
    const savedAttorney = await newAttorney.save();
    res.status(201).json(savedAttorney);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all attorneys
router.get("/", async (req, res) => {
  try {
    const attorneys = await Attorney.find();
    res.json(attorneys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read a specific attorney by ID
router.get("/:id", async (req, res) => {
  try {
    const attorney = await Attorney.findById(req.params.id);
    if (!attorney) {
      return res.status(404).json({ message: "Attorney not found" });
    }
    res.json(attorney);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get By city
router.get("/city/:city", async (req, res) => {
  try {
    const attorney = await Attorney.find({ city: req.params.city });
    if (!attorney) {
      return res.status(404).json({ message: "Attorney not found" });
    }
    res.json(attorney);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an attorney by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAttorney = await Attorney.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated attorney
    );

    if (!updatedAttorney) {
      return res.status(404).json({ message: "Attorney not found" });
    }

    res.json(updatedAttorney);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an attorney by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAttorney = await Attorney.findByIdAndDelete(req.params.id);

    if (!deletedAttorney) {
      return res.status(404).json({ message: "Attorney not found" });
    }

    res.json({ message: "Attorney deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
