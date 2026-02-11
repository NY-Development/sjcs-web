import * as studentService from "../services/student.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createStudent = async (req, res) => {
  const student = await studentService.createStudent(req.body);
  return successResponse(res, student, "Student created", 201);
};

export const listStudents = async (req, res) => {
  const students = await studentService.listStudents();
  return successResponse(res, students, "Students fetched");
};

export const getStudent = async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  return successResponse(res, student, "Student fetched");
};

export const updateStudent = async (req, res) => {
  const student = await studentService.updateStudent(req.params.id, req.body);
  return successResponse(res, student, "Student updated");
};

export const deleteStudent = async (req, res) => {
  const student = await studentService.deleteStudent(req.params.id);
  return successResponse(res, student, "Student deleted");
};

