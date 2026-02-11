import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Paid", "Overdue"], default: "Pending" },
    dueDate: { type: Date, required: true },
    paidAt: { type: Date },
    penaltyAmount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
