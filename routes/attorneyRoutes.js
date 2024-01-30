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
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const pageSize = parseInt(req.query.limit) || 3; // Number of attorneys per page (default: 10)

    const skip = (page - 1) * pageSize;

    // Using Mongoose aggregate to paginate and get total count
    const result = await Attorney.aggregate([
      {
        $match: { city: req.params.city },
      },
      {
        $sort: { createdAt: -1 }, // Replace 'createdAt' with the actual field representing creation date
      },
      {
        $facet: {
          attorneys: [{ $skip: skip }, { $limit: pageSize }],
          totalCount: [{ $count: "count" }],
        },
      },
      {
        $project: {
          attorneys: 1,
          totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
        },
      },
    ]);

    const attorneys = result[0].attorneys;
    const totalCount = result[0].totalCount;

    if (attorneys.length === 0) {
      return res
        .status(404)
        .json({ message: "No attorneys found in the specified city" });
    }

    res.json({
      attorneys,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
    });
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
