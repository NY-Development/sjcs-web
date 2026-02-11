import Notification from "../models/Notification.js";

export const createNotification = (data) => Notification.create(data);
export const listNotifications = () => Notification.find().populate("user");
export const getNotificationById = (id) =>
  Notification.findById(id).populate("user");
export const updateNotification = (id, data) =>
  Notification.findByIdAndUpdate(id, data, { new: true });
export const deleteNotification = (id) => Notification.findByIdAndDelete(id);
