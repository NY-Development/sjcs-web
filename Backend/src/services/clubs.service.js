const clubs = [
  {
    id: "debate",
    name: "Debate Club",
    category: "Academic",
    description:
      "Sharpen your rhetoric and public speaking skills through competitive discourse and regional tournaments.",
    members: 24,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCauhI5uhErshU4icRIPHwvPpaMmiW9TUIenLUGC663JJEli_h1EHwVAHAgmMv1V2OOJZNcqZJHkVctoY-FW695CqM91UHb8jWqhzWyukRYFh5qXvtABJUZiG9Pmv8tOfJBS_k8HXEp_qGoX_g11Unr4E_CelL0z7QC85jSMRzeGvIg8Ds7scIA9GuSg1ZVUmHQOaQTm3JtYEp2EBeI87vUfTPm936t8jhEpok1bCnF2LE88dF7NTmvgFC98zPLARCVSOcGgrzrdAeX",
    cta: "Join Club",
    tone: "blue"
  },
  {
    id: "robotics",
    name: "SJCS Robotics",
    category: "STEM",
    description:
      "Design, build, and code robots to compete in the regional FIRST Robotics competition.",
    members: 18,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARoZGuTodyDlm84eunt7Twa8PgbP9ccSJB17HTwfadrZ2qdDbSDf5DB1e-KuKNLtFSUjItFcgIk4CVaBIrVk5Sd55OHSWLzEkDLRof0ePCAwOZlbrI_L5AueWu5vUGCrhpvFgwvJ-8POA_FbK8hTSaFHCl_gx32OiZ1MMg3uoCb047QcXWLybOLxFRv-pkFhvlz-gvhC_7dhlANTqnA20ohCO-tgss9RCJwwOa5Ef2yQNQavuQz8JPYIRWi3Ol9hETMr2ZmJwZmyqI",
    cta: "Join Club",
    tone: "purple"
  },
  {
    id: "football",
    name: "Varsity Football",
    category: "Sports",
    description:
      "Go Jaguars! Join the team for the fall season. Tryouts begin in late August.",
    members: 45,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2Q1zLSFqh002kFYCcNTSWQJ7MM8lNo06pwZWEEWEo6m3xZtFZOzAMUX-cRKQzhOpoW48q9sTP9tS3XGmDQHBSsbFuOV1z7NuitE6v4juVEDMMn0z9J82puAjvs2mqFdkG2Ry_iHbk2KxPOsuz3I-GA-gyS8zQPHfSwfRJ4SKuMI4hUViDPGByU7KhF1AExwS_E2phWDmMIjvL0NinydW1jmh3WABIiRSsqTvtHKvqdJNs3ky-Es6ahUD5fznEddlQ5btFvdXmrtao",
    cta: "View Details",
    tone: "green"
  },
  {
    id: "art-society",
    name: "Art Society",
    category: "Arts",
    description:
      "Explore various mediums from watercolor to digital art. Weekly studio sessions.",
    members: 32,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBN59NLDh6ZKWg_MGLm55OitCYpXHjYsDizpzT9cozKGJ5nzzBxNI0j9VfpjkIaMERMNe-yNKaMX93yJUVSpCwbttnLdXoJbG4tYetq9fWiJjMfAE82OcsoNiJTrmRnuY41bq80qgUg02CT64o8eKPOyhQaNTuHKcXVeFGZRPePAZjLqyUCin3JIsoAeKyvm6jfwGquNiGhYF4sRg6H6YjoWbRKcCs8F1oq6x6lmae7FhqSGlTao-BeyaZiNQJLzxTUarcfs0KoWgIQ",
    cta: "Join Club",
    tone: "pink"
  },
  {
    id: "student-council",
    name: "Student Council",
    category: "Leadership",
    description:
      "Be the voice of the student body. Organize events and lead school initiatives.",
    members: 12,
    image: "",
    cta: "Application Closed",
    tone: "amber"
  },
  {
    id: "chess",
    name: "Chess Club",
    category: "Academic",
    description:
      "Train strategic thinking and compete in local chess tournaments.",
    members: 16,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLWSuBavNuhlP7MGGO5ujLoM_5KWvA1vg0TyNpr8WTcHT4zXbNInKdx-JDbS93l18PVMOXaUCYHqdMw1hZnszKH74vBlr7zR7dzBaLsW-VydEIInFGfPmEewt_giYhgLSQgYtT00j_QD7nUKpcjzcdzC02kUicfygmZg2BFitsWYvzM-zvEIfunk_lblI3prHY1JJZQhJD5so5cNQtARGf9ijhXjwSNoNob_Ebd7aOGT911-3opBIRo6EZJo7snGfXg9inDElpa5a3",
    cta: "Join Club",
    tone: "blue"
  }
];

const clubDetails = {
  robotics: {
    id: "robotics",
    name: "SJCS Robotics Team",
    description:
      "Innovating for the future, one bot at a time. Join us to learn engineering, coding, and teamwork.",
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRTUV7Pun2XNecOdlYuAL62hobXkzWVs2xCyk_GPc5sYoEGXE311Ih691i5Ri3zZm1AKavuE6fgVuj3Tu-m12owtv8ypoYA2cQofjhJq1SCtOnOsLKZvbLhfv8ld8qIQAQ7k7vYsuC4npQQADykemUqCtg67GNKLg7fqnqrEi7Z6zK7Ul4xqfewAwsudY0oB-6-B2T6uD_Ssz_HhWXT6DR_TROWovHXABHl_kEMO6I6l0IthhcXpUoVGy0RM-fSBA5Q6tZtENajkrv",
    members: 28,
    location: "Room 304 (Science Wing)",
    schedule: "Tue & Thu, 3:30 PM",
    advisor: "Mr. Davidson",
    category: "STEM"
  }
};

const announcements = {
  robotics: [
    {
      id: "announcement-1",
      pinned: true,
      title: "IMPORTANT: Meeting moved to Room 304",
      author: "Mr. Davidson",
      role: "Advisor",
      time: "Today, 8:30 AM",
      summary:
        "Due to the A/V setup for the upcoming assembly, we are moving today's practice session back to Room 304.",
      tags: ["Urgent", "Logistics"]
    },
    {
      id: "announcement-2",
      pinned: false,
      title: "Great job at the Regional Qualifier!",
      author: "Sarah Jenkins",
      role: "President",
      time: "Yesterday, 4:15 PM",
      summary:
        "We placed 3rd overall and qualified for the state championship. Let's keep the momentum going.",
      tags: ["Celebration", "Team"]
    },
    {
      id: "announcement-3",
      pinned: false,
      title: "Parts inventory due Friday",
      author: "Alex Lee",
      role: "Treasurer",
      time: "Oct 20, 2023",
      summary:
        "Please submit your requested parts list by Friday so we can finalize the budget.",
      tags: ["Finance", "Reminder"]
    }
  ]
};

export const listClubs = async () => clubs;

export const getClubById = async (clubId) => {
  const club = clubDetails[clubId] || clubs.find((item) => item.id === clubId);
  if (!club) {
    return clubDetails.robotics;
  }
  return club;
};

export const getClubAnnouncements = async (clubId) => {
  return announcements[clubId] || announcements.robotics;
};
