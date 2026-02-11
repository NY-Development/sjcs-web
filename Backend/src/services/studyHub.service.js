import User from "../models/User.js";

const fallbackOverview = {
  greeting: "Good afternoon, Michael",
  focusTime: "4.2h",
  streak: "5 Days",
  productivity: [40, 65, 80, 30, 20, 10, 5],
  tasks: [
    {
      id: "task-1",
      title: "Calculus Quiz Prep",
      meta: "Tomorrow, 9:00 AM • Math",
      priority: "red"
    },
    {
      id: "task-2",
      title: "Read The Great Gatsby Ch. 4",
      meta: "Friday • English",
      priority: "yellow"
    },
    {
      id: "task-3",
      title: "Theology Reflection Paper",
      meta: "Monday • Theology",
      priority: "blue"
    }
  ]
};

export const getStudyHubOverview = async (userId) => {
  const user = await User.findById(userId).lean();
  if (!user) {
    return fallbackOverview;
  }

  return {
    ...fallbackOverview,
    greeting: `Good afternoon, ${user.firstName || "Student"}`
  };
};
