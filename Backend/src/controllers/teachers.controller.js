import * as teacherService from "../services/teacher.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createTeacher = async (req, res) => {
  const teacher = await teacherService.createTeacher(req.body);
  return successResponse(res, teacher, "Teacher created", 201);
};

export const listTeachers = async (req, res) => {
  const teachers = await teacherService.listTeachers();
  return successResponse(res, teachers, "Teachers fetched");
};

export const getTeacher = async (req, res) => {
  const teacher = await teacherService.getTeacherById(req.params.id);
  return successResponse(res, teacher, "Teacher fetched");
};

export const updateTeacher = async (req, res) => {
  const teacher = await teacherService.updateTeacher(req.params.id, req.body);
  return successResponse(res, teacher, "Teacher updated");
};

export const deleteTeacher = async (req, res) => {
  const teacher = await teacherService.deleteTeacher(req.params.id);
  return successResponse(res, teacher, "Teacher deleted");
};

