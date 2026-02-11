import User from "../models/User.js";
import Student from "../models/Student.js";
import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";

const buildFullName = (user) => {
  if (!user) return "User";
  return `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
};

const normalizeGrade = (gradeLevel) => {
  if (!gradeLevel) return "Grade 11";
  const lower = String(gradeLevel).toLowerCase();
  return lower.includes("grade") ? String(gradeLevel) : `Grade ${gradeLevel}`;
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId).lean();
  const student = user
    ? await Student.findOne({ user: user._id }).populate("class").lean()
    : null;

  const studentId = student?.studentId ? String(student.studentId) : "2024-8892";
  const gradeLabel = normalizeGrade(student?.class?.gradeLevel);

  const attendanceTotal = student
    ? await Attendance.countDocuments({ student: student._id })
    : 0;
  const attendancePresent = student
    ? await Attendance.countDocuments({ student: student._id, status: "Present" })
    : 0;
  const attendanceRate = attendanceTotal
    ? `${Math.round((attendancePresent / attendanceTotal) * 100)}%`
    : "98%";

  const gradeAgg = student
    ? await Grade.aggregate([
        { $match: { student: student._id } },
        { $group: { _id: null, avgScore: { $avg: "$score" } } }
      ])
    : [];
  const avgScore = gradeAgg[0]?.avgScore || 0;
  const gpa = avgScore ? (Math.min(avgScore / 25, 4)).toFixed(1) : "3.8";

  return {
    fullName: buildFullName(user),
    role: user?.role || "Student",
    grade: gradeLabel,
    studentId,
    attendance: attendanceRate,
    gpa,
    merits: "12",
    dateOfBirth: "March 12, 2007",
    email: user?.email || "student@sjcs.edu",
    phone: "(555) 123-4567",
    address: "123 Maple Ave, Springfield, IL 62704",
    academicStatus: {
      classYear: "Junior (2025)",
      homeroom: "Mrs. Robinson",
      room: "Room 304",
      termStatus: "Active"
    },
    house: {
      name: "St. Peter's House",
      motto: "Faith and Courage",
      points: 1240
    }
  };
};
