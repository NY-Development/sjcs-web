import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employeeId: { type: String, unique: true, trim: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    hireDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
