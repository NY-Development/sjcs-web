import ClassModel from "../models/Class.js";

export const createClass = (data) => ClassModel.create(data);
export const listClasses = () => ClassModel.find().populate("teacher subjects");
export const getClassById = (id) => ClassModel.findById(id).populate("teacher subjects");
export const updateClass = (id, data) =>
  ClassModel.findByIdAndUpdate(id, data, { new: true });
export const deleteClass = (id) => ClassModel.findByIdAndDelete(id);
