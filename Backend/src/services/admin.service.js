import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import Payment from "../models/Payment.js";
import Attendance from "../models/Attendance.js";
import Notification from "../models/Notification.js";
import Grade from "../models/Grade.js";

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

const fallbackDashboard = {
  dateLabel: "Oct 24, 2023 - Fall Semester",
  kpis: {
    students: { total: 1240, delta: "+12" },
    teachers: { total: 85, delta: "0" },
    collection: { collected: 450000, target: 510000 },
    attendanceRate: 94.2
  },
  financeByMonth: [
    { month: "May", income: 60, expenses: 45 },
    { month: "Jun", income: 75, expenses: 50 },
    { month: "Jul", income: 40, expenses: 45 },
    { month: "Aug", income: 90, expenses: 55 },
    { month: "Sep", income: 85, expenses: 60 },
    { month: "Oct", income: 65, expenses: 55 }
  ],
  attendanceTrend: [35, 32, 25, 15, 20, 10],
  recentActivity: [
    {
      id: "activity-1",
      icon: "attach_money",
      title: "Tuition Payment",
      detail: "Student Michael B. paid $1,200",
      time: "2 mins ago",
      tone: "emerald"
    },
    {
      id: "activity-2",
      icon: "assignment_ind",
      title: "New Registration",
      detail: "New student Sarah J. added to Grade 5",
      time: "1 hour ago",
      tone: "blue"
    },
    {
      id: "activity-3",
      icon: "notifications_active",
      title: "Broadcast Sent",
      detail: "School closed on Friday alert sent",
      time: "3 hours ago",
      tone: "amber"
    },
    {
      id: "activity-4",
      icon: "grade",
      title: "Grades Updated",
      detail: "Mr. Anderson updated Math 101",
      time: "5 hours ago",
      tone: "purple"
    }
  ]
};

const sumByStatus = (aggregates, status) => {
  const entry = aggregates.find((item) => item._id === status);
  return entry ? entry.total : 0;
};

const buildFinanceByMonth = async () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const aggregates = await Payment.aggregate([
    {
      $project: {
        amount: 1,
        paidDate: { $ifNull: ["$paidAt", "$createdAt"] }
      }
    },
    { $match: { paidDate: { $gte: start } } },
    {
      $group: {
        _id: { year: { $year: "$paidDate" }, month: { $month: "$paidDate" } },
        total: { $sum: "$amount" }
      }
    }
  ]);

  const map = new Map();
  aggregates.forEach((item) => {
    const key = `${item._id.year}-${item._id.month}`;
    map.set(key, item.total);
  });

  const rows = [];
  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const income = map.get(key) || 0;
    rows.push({
      month: monthNames[date.getMonth()],
      income: Math.round(income / 1000),
      expenses: Math.round(income * 0.6 / 1000)
    });
  }

  const hasData = rows.some((row) => row.income > 0);
  return hasData ? rows : fallbackDashboard.financeByMonth;
};

const buildAttendanceTrend = async () => {
  const now = new Date();
  const requests = [];
  for (let i = 5; i >= 0; i -= 1) {
    const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i + 1);
    requests.push(
      Attendance.countDocuments({ date: { $gte: dayStart, $lt: dayEnd } })
    );
  }

  const counts = await Promise.all(requests);
  const hasData = counts.some((count) => count > 0);
  return hasData ? counts : fallbackDashboard.attendanceTrend;
};

const buildRecentActivity = async () => {
  const payments = await Payment.find().sort({ createdAt: -1 }).limit(2).populate({
    path: "student",
    populate: { path: "user" }
  });
  const notifications = await Notification.find().sort({ createdAt: -1 }).limit(1);
  const grades = await Grade.find().sort({ createdAt: -1 }).limit(1);

  const activity = [];

  payments.forEach((payment, index) => {
    const studentUser = payment.student?.user;
    const studentName = studentUser
      ? `${studentUser.firstName || ""} ${studentUser.lastName || ""}`.trim()
      : "Student";
    activity.push({
      id: `payment-${payment._id}`,
      icon: "attach_money",
      title: "Tuition Payment",
      detail: `${studentName || "Student"} paid $${payment.amount}`,
      time: formatDate(payment.createdAt),
      tone: index % 2 === 0 ? "emerald" : "blue"
    });
  });

  notifications.forEach((notification) => {
    activity.push({
      id: `notification-${notification._id}`,
      icon: "notifications_active",
      title: "Broadcast Sent",
      detail: notification.title,
      time: formatDate(notification.createdAt),
      tone: "amber"
    });
  });

  grades.forEach((grade) => {
    activity.push({
      id: `grade-${grade._id}`,
      icon: "grade",
      title: "Grades Updated",
      detail: `Score update posted for term ${grade.term || "current"}`,
      time: formatDate(grade.createdAt),
      tone: "purple"
    });
  });

  return activity.length ? activity.slice(0, 4) : fallbackDashboard.recentActivity;
};

export const getAdminDashboard = async () => {
  const [studentCount, teacherCount, paymentAgg, attendanceTotal, attendancePresent] =
    await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Payment.aggregate([
        { $group: { _id: "$status", total: { $sum: "$amount" } } }
      ]),
      Attendance.countDocuments(),
      Attendance.countDocuments({ status: "Present" })
    ]);

  const paidTotal = sumByStatus(paymentAgg, "Paid");
  const pendingTotal = sumByStatus(paymentAgg, "Pending");
  const overdueTotal = sumByStatus(paymentAgg, "Overdue");
  const targetTotal = paidTotal + pendingTotal + overdueTotal;
  const attendanceRate = attendanceTotal
    ? Number(((attendancePresent / attendanceTotal) * 100).toFixed(1))
    : fallbackDashboard.kpis.attendanceRate;

  const hasData = studentCount > 0 || teacherCount > 0 || targetTotal > 0 || attendanceTotal > 0;

  if (!hasData) {
    return fallbackDashboard;
  }

  const financeByMonth = await buildFinanceByMonth();
  const attendanceTrend = await buildAttendanceTrend();
  const recentActivity = await buildRecentActivity();

  return {
    dateLabel: `${formatDate(new Date())} - Current Term`,
    kpis: {
      students: { total: studentCount, delta: "+0" },
      teachers: { total: teacherCount, delta: "0" },
      collection: {
        collected: paidTotal,
        target: targetTotal || paidTotal
      },
      attendanceRate
    },
    financeByMonth,
    attendanceTrend,
    recentActivity
  };
};
