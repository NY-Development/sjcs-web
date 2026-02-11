import * as classService from "../services/class.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createClass = async (req, res) => {
  const classItem = await classService.createClass(req.body);
  return successResponse(res, classItem, "Class created", 201);
};

export const listClasses = async (req, res) => {
  const classes = await classService.listClasses();
  return successResponse(res, classes, "Classes fetched");
};

export const getClass = async (req, res) => {
  const classItem = await classService.getClassById(req.params.id);
  return successResponse(res, classItem, "Class fetched");
};

export const updateClass = async (req, res) => {
  const classItem = await classService.updateClass(req.params.id, req.body);
  return successResponse(res, classItem, "Class updated");
};

export const deleteClass = async (req, res) => {
  const classItem = await classService.deleteClass(req.params.id);
  return successResponse(res, classItem, "Class deleted");
};

