import Payment from "../models/Payment.js";

export const createPayment = (data) => Payment.create(data);
export const listPayments = () => Payment.find().populate("student");
export const getPaymentById = (id) => Payment.findById(id).populate("student");
export const updatePayment = (id, data) =>
  Payment.findByIdAndUpdate(id, data, { new: true });
export const deletePayment = (id) => Payment.findByIdAndDelete(id);

export const markPaid = async (id) => {
  return Payment.findByIdAndUpdate(
    id,
    { status: "Paid", paidAt: new Date() },
    { new: true }
  );
};

export const applyOverduePenalties = async ({ rate = 0.05 } = {}) => {
  const now = new Date();
  const overduePayments = await Payment.find({
    status: { $ne: "Paid" },
    dueDate: { $lt: now }
  });

  const updates = overduePayments.map((payment) => {
    const penalty = payment.amount * rate;
    payment.status = "Overdue";
    payment.penaltyAmount = penalty;
    return payment.save();
  });

  return Promise.all(updates);
};
