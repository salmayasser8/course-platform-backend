import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: [true, "email is required"] },
    password: {
      type: String,
      required: true,
      minLength: [8, "password should be at least 8 chracters"],
    },
    role: { type: String, enum: ["student", "instructor"], default: "student" },
  },
  { timestamps: true },
);
userSchema.pre("save", async function () {
  //encrypt password
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
