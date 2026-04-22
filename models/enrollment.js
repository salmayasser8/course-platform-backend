import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true },
);
export default mongoose.model("Enrollment", enrollmentSchema);
