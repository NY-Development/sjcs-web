import * as notificationService from "../services/notification.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createNotification = async (req, res) => {
  const notification = await notificationService.createNotification(req.body);
  return successResponse(res, notification, "Notification created", 201);
};

export const listNotifications = async (req, res) => {
  const notifications = await notificationService.listNotifications();
  return successResponse(res, notifications, "Notifications fetched");
};

export const getNotification = async (req, res) => {
  const notification = await notificationService.getNotificationById(req.params.id);
  return successResponse(res, notification, "Notification fetched");
};

export const updateNotification = async (req, res) => {
  const notification = await notificationService.updateNotification(
    req.params.id,
    req.body
  );
  return successResponse(res, notification, "Notification updated");
};

export const deleteNotification = async (req, res) => {
  const notification = await notificationService.deleteNotification(req.params.id);
  return successResponse(res, notification, "Notification deleted");
};

export const getPreferences = async (req, res) => {
  const preferences = notificationService.getPreferencesForUser(req.user?.id);
  return successResponse(res, preferences, "Notification preferences fetched");
};

export const updatePreferences = async (req, res) => {
  const preferences = notificationService.updatePreferencesForUser(req.user?.id, req.body);
  return successResponse(res, preferences, "Notification preferences updated");
};

