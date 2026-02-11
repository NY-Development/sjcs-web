import * as subjectService from "../services/subject.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createSubject = async (req, res) => {
  const subject = await subjectService.createSubject(req.body);
  return successResponse(res, subject, "Subject created", 201);
};

export const listSubjects = async (req, res) => {
  const subjects = await subjectService.listSubjects();
  return successResponse(res, subjects, "Subjects fetched");
};

export const getSubject = async (req, res) => {
  const subject = await subjectService.getSubjectById(req.params.id);
  return successResponse(res, subject, "Subject fetched");
};

export const updateSubject = async (req, res) => {
  const subject = await subjectService.updateSubject(req.params.id, req.body);
  return successResponse(res, subject, "Subject updated");
};

export const deleteSubject = async (req, res) => {
  const subject = await subjectService.deleteSubject(req.params.id);
  return successResponse(res, subject, "Subject deleted");
};

