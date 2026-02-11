import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    studentId: { type: String, unique: true, trim: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    guardianName: { type: String, trim: true },
    guardianEmail: { type: String, trim: true, lowercase: true },
    enrollmentDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
