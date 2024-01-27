// models/FaqModel.js
import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  city: {
    type: String,
  },
});

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;
