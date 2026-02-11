const securitySettings = {
  twoFactorEnabled: false,
  passwordLastChanged: "30 days ago",
  sessions: [
    {
      id: "session-1",
      device: "Windows PC - Chrome",
      location: "San Francisco, CA",
      ip: "192.168.1.1",
      status: "Active now",
      isCurrent: true
    },
    {
      id: "session-2",
      device: "iPhone 13 - Safari",
      location: "San Francisco, CA",
      ip: "172.16.0.45",
      status: "Last active 2 days ago",
      isCurrent: false
    }
  ]
};

export const getSecuritySettings = async () => securitySettings;
