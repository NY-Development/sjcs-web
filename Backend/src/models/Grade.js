import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    score: { type: Number, required: true },
    term: { type: String, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Grade", gradeSchema);
