import EventEmitter from "events";

const notificationsEmitter = new EventEmitter();

export const emitNotification = (payload) => {
  notificationsEmitter.emit("notification", payload);
};

export const onNotification = (handler) => {
  notificationsEmitter.on("notification", handler);
};
