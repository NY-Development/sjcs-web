import Notification from "../models/Notification.js";

export const createNotification = (data) => Notification.create(data);
export const listNotifications = () => Notification.find().populate("user");
export const getNotificationById = (id) =>
  Notification.findById(id).populate("user");
export const updateNotification = (id, data) =>
  Notification.findByIdAndUpdate(id, data, { new: true });
export const deleteNotification = (id) => Notification.findByIdAndDelete(id);

const defaultPreferences = () => ({
  channels: {
    email: true,
    sms: true,
    push: true
  },
  categories: {
    academic: {
      enabled: true,
      options: {
        grades: true,
        assignments: true,
        absences: true,
        teacherMessages: false
      }
    },
    financial: {
      enabled: true,
      options: {
        invoice: true,
        paymentSuccess: true,
        paymentOverdue: true
      }
    },
    clubs: {
      enabled: false,
      options: {
        events: false,
        scheduleChanges: false
      }
    },
    system: {
      enabled: true,
      options: {
        maintenance: true,
        featureAnnouncements: false
      }
    }
  }
});

const preferenceStore = new Map();

export const getPreferencesForUser = (userId) => {
  if (!userId) {
    return defaultPreferences();
  }
  return preferenceStore.get(String(userId)) || defaultPreferences();
};

export const updatePreferencesForUser = (userId, preferences) => {
  const key = String(userId || "");
  const payload = preferences || defaultPreferences();
  if (key) {
    preferenceStore.set(key, payload);
  }
  return payload;
};
