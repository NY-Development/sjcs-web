import Payment from "../models/Payment.js";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const formatDate = (date) => {
  if (!date) return "";
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const fallbackOverview = {
  totalRevenue: 1245000,
  pendingInvoices: 45200,
  collectionRate: 92,
  overdueAmount: 12450
};

const fallbackTransactions = [
  {
    id: "txn-1",
    studentName: "Liam Smith",
    studentId: "#2023-089",
    grade: "Grade 5",
    feeType: "Tuition Fee - Term 2",
    date: "Oct 24, 2023",
    amount: 500,
    status: "Paid"
  },
  {
    id: "txn-2",
    studentName: "Olivia Davis",
    studentId: "#2023-102",
    grade: "Grade 10",
    feeType: "Bus Fee (Annual)",
    date: "Oct 22, 2023",
    amount: 150,
    status: "Overdue"
  },
  {
    id: "txn-3",
    studentName: "Noah Wilson",
    studentId: "#2023-156",
    grade: "Grade 3",
    feeType: "Uniform Set",
    date: "Oct 20, 2023",
    amount: 85,
    status: "Processing"
  }
];

const sumByStatus = (aggregates, status) => {
  const entry = aggregates.find((item) => item._id === status);
  return entry ? entry.total : 0;
};

const normalizeGrade = (gradeLevel) => {
  if (!gradeLevel) return "Grade";
  const lower = String(gradeLevel).toLowerCase();
  return lower.includes("grade") ? String(gradeLevel) : `Grade ${gradeLevel}`;
};

export const getFinanceOverview = async () => {
  const aggregates = await Payment.aggregate([
    { $group: { _id: "$status", total: { $sum: "$amount" } } }
  ]);

  const paidTotal = sumByStatus(aggregates, "Paid");
  const pendingTotal = sumByStatus(aggregates, "Pending");
  const overdueTotal = sumByStatus(aggregates, "Overdue");
  const targetTotal = paidTotal + pendingTotal + overdueTotal;
  const collectionRate = targetTotal
    ? Math.round((paidTotal / targetTotal) * 100)
    : 0;

  if (!targetTotal) {
    return fallbackOverview;
  }

  return {
    totalRevenue: paidTotal,
    pendingInvoices: pendingTotal,
    collectionRate,
    overdueAmount: overdueTotal
  };
};

export const getFinanceTransactions = async () => {
  const payments = await Payment.find()
    .sort({ createdAt: -1 })
    .limit(12)
    .populate({ path: "student", populate: ["user", "class"] });

  if (!payments.length) {
    return fallbackTransactions;
  }

  return payments.map((payment) => {
    const student = payment.student;
    const studentUser = student?.user;
    const studentName = studentUser
      ? `${studentUser.firstName || ""} ${studentUser.lastName || ""}`.trim()
      : "Student";
    const studentId = student?.studentId ? `#${student.studentId}` : "#--";
    const grade = normalizeGrade(student?.class?.gradeLevel);

    return {
      id: String(payment._id),
      studentName: studentName || "Student",
      studentId,
      grade,
      feeType: "Tuition Fee",
      date: formatDate(payment.createdAt),
      amount: payment.amount,
      status: payment.status === "Pending" ? "Processing" : payment.status
    };
  });
};
