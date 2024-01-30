// models/videoModel.js
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },

}, {
  timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
