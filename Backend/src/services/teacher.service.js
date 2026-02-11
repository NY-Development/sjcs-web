import Teacher from "../models/Teacher.js";

export const createTeacher = (data) => Teacher.create(data);
export const listTeachers = () => Teacher.find().populate("user subjects");
export const getTeacherById = (id) => Teacher.findById(id).populate("user subjects");
export const updateTeacher = (id, data) =>
  Teacher.findByIdAndUpdate(id, data, { new: true });
export const deleteTeacher = (id) => Teacher.findByIdAndDelete(id);
