import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
