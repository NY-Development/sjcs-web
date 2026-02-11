import * as attendanceService from "../services/attendance.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createAttendance = async (req, res) => {
  const record = await attendanceService.createAttendance(req.body);
  return successResponse(res, record, "Attendance created", 201);
};

export const listAttendance = async (req, res) => {
  const records = await attendanceService.listAttendance();
  return successResponse(res, records, "Attendance fetched");
};

export const getAttendance = async (req, res) => {
  const record = await attendanceService.getAttendanceById(req.params.id);
  return successResponse(res, record, "Attendance fetched");
};

export const updateAttendance = async (req, res) => {
  const record = await attendanceService.updateAttendance(req.params.id, req.body);
  return successResponse(res, record, "Attendance updated");
};

export const deleteAttendance = async (req, res) => {
  const record = await attendanceService.deleteAttendance(req.params.id);
  return successResponse(res, record, "Attendance deleted");
};

