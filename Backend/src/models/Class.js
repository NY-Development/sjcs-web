import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gradeLevel: { type: String, trim: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }]
  },
  { timestamps: true }
);

export default mongoose.model("Class", classSchema);
