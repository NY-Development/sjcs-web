import Student from "../models/Student.js";

export const createStudent = (data) => Student.create(data);
export const listStudents = () => Student.find().populate("user class");
export const getStudentById = (id) => Student.findById(id).populate("user class");
export const updateStudent = (id, data) =>
  Student.findByIdAndUpdate(id, data, { new: true });
export const deleteStudent = (id) => Student.findByIdAndDelete(id);
