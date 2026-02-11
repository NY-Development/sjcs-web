import Grade from "../models/Grade.js";

export const createGrade = (data) => Grade.create(data);
export const listGrades = () => Grade.find().populate("student subject");
export const getGradeById = (id) => Grade.findById(id).populate("student subject");
export const updateGrade = (id, data) =>
  Grade.findByIdAndUpdate(id, data, { new: true });
export const deleteGrade = (id) => Grade.findByIdAndDelete(id);
