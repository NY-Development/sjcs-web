import Student from "../models/Student.js";
import Grade from "../models/Grade.js";
import Payment from "../models/Payment.js";

const fallbackSummary = {
  enrollment: 1240,
  enrollmentDelta: 5.2,
  averageGpa: 3.42,
  tuitionCollected: 4200000,
  tuitionProgress: 98,
  facultyAttendance: 96.5,
  facultyDelta: -1.2,
  enrollmentHistory: [
    { year: "2019", value: 1050 },
    { year: "2020", value: 1120 },
    { year: "2021", value: 980 },
    { year: "2022", value: 1180 },
    { year: "2023", value: 1240 }
  ],
  departmentDistribution: [
    { label: "Science & Math", value: 42, tone: "bg-sjcs-blue" },
    { label: "Humanities & Arts", value: 35, tone: "bg-indigo-400" },
    { label: "Physical Ed", value: 15, tone: "bg-emerald-400" },
    { label: "Other", value: 8, tone: "bg-amber-400" }
  ]
};

const fallbackReports = [
  {
    id: "rep-1",
    name: "Annual Financial Summary 2023",
    category: "Financial",
    generatedAt: "Oct 24, 2023",
    author: "Finance Dept",
    status: "Ready",
    icon: "picture_as_pdf",
    tone: "red"
  },
  {
    id: "rep-2",
    name: "Class Performance Ranking - Senior High",
    category: "Academic",
    generatedAt: "Oct 20, 2023",
    author: "Academic Office",
    status: "Ready",
    icon: "description",
    tone: "blue"
  },
  {
    id: "rep-3",
    name: "Faculty Attendance Review",
    category: "HR",
    generatedAt: "Oct 18, 2023",
    author: "HR Dept",
    status: "Pending",
    icon: "assignment",
    tone: "amber"
  }
];

const sumByStatus = (aggregates, status) => {
  const entry = aggregates.find((item) => item._id === status);
  return entry ? entry.total : 0;
};

export const getReportsSummary = async () => {
  const [enrollment, gradeAgg, paymentAgg] = await Promise.all([
    Student.countDocuments(),
    Grade.aggregate([
      { $group: { _id: null, avgScore: { $avg: "$score" } } }
    ]),
    Payment.aggregate([
      { $group: { _id: "$status", total: { $sum: "$amount" } } }
    ])
  ]);

  const avgScore = gradeAgg[0]?.avgScore || 0;
  const averageGpa = avgScore ? Number(Math.min(avgScore / 25, 4).toFixed(2)) : fallbackSummary.averageGpa;

  const paidTotal = sumByStatus(paymentAgg, "Paid");
  const pendingTotal = sumByStatus(paymentAgg, "Pending");
  const overdueTotal = sumByStatus(paymentAgg, "Overdue");
  const totalDue = paidTotal + pendingTotal + overdueTotal;
  const tuitionProgress = totalDue ? Math.round((paidTotal / totalDue) * 100) : 0;

  return {
    enrollment: enrollment || fallbackSummary.enrollment,
    enrollmentDelta: fallbackSummary.enrollmentDelta,
    averageGpa,
    tuitionCollected: paidTotal || fallbackSummary.tuitionCollected,
    tuitionProgress: tuitionProgress || fallbackSummary.tuitionProgress,
    facultyAttendance: fallbackSummary.facultyAttendance,
    facultyDelta: fallbackSummary.facultyDelta,
    enrollmentHistory: fallbackSummary.enrollmentHistory,
    departmentDistribution: fallbackSummary.departmentDistribution
  };
};

export const getReportsList = async () => fallbackReports;
