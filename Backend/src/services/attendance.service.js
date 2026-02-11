import Attendance from "../models/Attendance.js";

export const createAttendance = (data) => Attendance.create(data);
export const listAttendance = () => Attendance.find().populate("student");
export const getAttendanceById = (id) => Attendance.findById(id).populate("student");
export const updateAttendance = (id, data) =>
  Attendance.findByIdAndUpdate(id, data, { new: true });
export const deleteAttendance = (id) => Attendance.findByIdAndDelete(id);
