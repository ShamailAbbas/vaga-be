// routes/reviewRoutes.js
import express from "express";
import Review from "../models/reviewModel.js";

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single review by ID
router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get a Reviews by city
router.get("/city/:city", async (req, res) => {
  try {
    const review = await Review.find({ city: req.params.city });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get average stars for a city
router.get("/average/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const result = await Review.aggregate([
      { $match: { city } },
      {
        $group: {
          _id: null,
          averageStars: { $avg: "$stars" },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No reviews found for the city" });
    }

    const averageStars = result[0].averageStars;

    res.json({ city, averageStars });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create a new review
router.post("/", async (req, res) => {
  const review = new Review(req.body);

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a review by ID
router.put("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated review
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a review by ID
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
