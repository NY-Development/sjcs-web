import Subject from "../models/Subject.js";

export const createSubject = (data) => Subject.create(data);
export const listSubjects = () => Subject.find().populate("teacher");
export const getSubjectById = (id) => Subject.findById(id).populate("teacher");
export const updateSubject = (id, data) =>
  Subject.findByIdAndUpdate(id, data, { new: true });
export const deleteSubject = (id) => Subject.findByIdAndDelete(id);
