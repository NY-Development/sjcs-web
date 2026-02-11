let lastRegistration = null;

export const submitStepTwo = async (payload) => {
  lastRegistration = {
    name: payload?.fullName || "Student",
    email: payload?.email || "student@sjcs.edu",
    referenceId: `#TR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "Pending Approval",
    submittedAt: "Submitted today",
    nextStep: "Admin Review",
    activation: "Awaiting approval"
  };

  return lastRegistration;
};

export const getRegistrationStatus = async () => {
  return (
    lastRegistration || {
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      referenceId: "#TR-2023-8492",
      status: "Pending Approval",
      submittedAt: "Submitted today",
      nextStep: "Admin Review",
      activation: "Awaiting approval"
    }
  );
};
