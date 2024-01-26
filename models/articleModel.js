// models/articleModel.js
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  date: String,
  type: String,
  description: String,
  state: String,
  city: String,
  slug: String,
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
