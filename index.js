import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import articleRoutes from "./routes/articleRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import attornyRoutes from "./routes/attorneyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";

import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(
  "mongodb+srv://vaga:vaga@cluster0.zo3h2im.mongodb.net/vaga?retryWrites=true&w=majority"
);
app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/attornies", attornyRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
