import mongoose from "mongoose";

const attorneySchema = new mongoose.Schema({
  image: {
    type: String,
  },
  phone: {
    type: Number,
  },
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  description: {
    type: String,
  },
  firm: {
    type: String,
  },
  website: {
    type: String,
  },
 
}, {
  timestamps: true, // This option adds 'createdAt' and 'updatedAt' fields
});

const Attorney = mongoose.model("Attorney", attorneySchema);

export default Attorney;
