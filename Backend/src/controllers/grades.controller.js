import * as gradeService from "../services/grade.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createGrade = async (req, res) => {
  const grade = await gradeService.createGrade(req.body);
  return successResponse(res, grade, "Grade created", 201);
};

export const listGrades = async (req, res) => {
  const grades = await gradeService.listGrades();
  return successResponse(res, grades, "Grades fetched");
};

export const getGrade = async (req, res) => {
  const grade = await gradeService.getGradeById(req.params.id);
  return successResponse(res, grade, "Grade fetched");
};

export const updateGrade = async (req, res) => {
  const grade = await gradeService.updateGrade(req.params.id, req.body);
  return successResponse(res, grade, "Grade updated");
};

export const deleteGrade = async (req, res) => {
  const grade = await gradeService.deleteGrade(req.params.id);
  return successResponse(res, grade, "Grade deleted");
};

