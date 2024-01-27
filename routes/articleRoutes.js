// routes/articleRoutes.js
import express from "express";
import Article from "../models/articleModel.js";
const router = express.Router();
// Get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single article
router.get("/:state/:city/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({
      state: req.params.state,
      city: req.params.city,
      slug: req.params.slug,
    });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get By city
router.get("/city/:city", async (req, res) => {
  try {
    const article = await Article.find({ city: req.params.city });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new article
router.post("/", async (req, res) => {
  const article = new Article(req.body);

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an article
router.put("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    Object.assign(article, req.body);

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an article
router.delete("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.remove();
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
