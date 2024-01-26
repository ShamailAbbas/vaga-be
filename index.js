import express from "express";
import mongoose from "mongoose";
import articleRoutes from "./routes/articleRoutes.js";
import cityRoutes from "./routes/cityRoutes.js";
import attornyRoutes from "./routes/attorneyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(
  "mongodb+srv://vaga:vaga@cluster0.zo3h2im.mongodb.net/vaga?retryWrites=true&w=majority"
);

app.use(express.json());

app.use("/articles", articleRoutes);
app.use("/cities", cityRoutes);
app.use("/attornies", attornyRoutes);
app.use("/reviews", reviewRoutes);
app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
