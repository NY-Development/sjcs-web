import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const fallbackClub = {
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
};

const fallbackAnnouncements = [
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
];

const ClubDetailPage = () => {
  const { accessToken } = useAuthStore();
  const { clubId } = useParams();

  const { data: clubData } = useQuery({
    queryKey: ["club-detail", clubId],
    queryFn: async () => (await api.get(`/clubs/${clubId}`)).data.data,
    enabled: Boolean(accessToken)
  });

  const { data: announcementsData = [] } = useQuery({
    queryKey: ["club-announcements", clubId],
    queryFn: async () => (await api.get(`/clubs/${clubId}/announcements`)).data.data || [],
    enabled: Boolean(accessToken)
  });

  const club = clubData || fallbackClub;
  const announcements = announcementsData.length ? announcementsData : fallbackAnnouncements;
  const pinned = useMemo(() => announcements.find((item) => item.pinned), [announcements]);
  const otherAnnouncements = announcements.filter((item) => !item.pinned);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="text-sjcs-blue text-2xl font-bold">SJCS Connect</span>
            <div className="hidden sm:flex items-center gap-6 text-sm text-slate-500">
              <span>Dashboard</span>
              <span className="text-sjcs-blue font-semibold">Clubs & Org</span>
              <span>Calendar</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-sjcs-blue/10 p-2 text-sjcs-blue" type="button">
              <span className="material-icons text-xl">notifications</span>
            </button>
            <img
              alt="User avatar"
              className="h-8 w-8 rounded-full border border-slate-200"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdWP7weMEOD8Ebl1qbeuJJb0NywfEqGRcKezERMRnaHcxeOXJxCQ_TmItt-GxZR4Si-0tC1gcsBa_1mNBL-5ssBkqvp4S-vn-Q2ULIWhSRbSRp1Og3Au1uwK3AxNyzSm1Y_f7101uKlaRLmha6msxMtLo_qQdyzDUxi4OoChY11Tg8wi8BGRJpCcRplJFVcpzy6xI-Zwc0k9iJ-TeHIMnS4ey0q8qiyJI4DcqTPjHJud50gtF6hmnNS-ErHkXYsu0l12hQ7_XxuTO4"
            />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center text-sm text-slate-500">
          <Link className="hover:text-sjcs-blue" to="/clubs">
            Clubs
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-medium text-sjcs-blue">{club.name}</span>
        </nav>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-48 sm:h-64">
            <img alt={club.name} className="h-full w-full object-cover" src={club.banner} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-sjcs-blue text-2xl font-bold shadow-lg">
                <span className="material-icons">smart_toy</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{club.name}</h1>
                <p className="max-w-2xl text-sm text-slate-100">{club.description}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <span className="material-icons text-slate-400">groups</span>
                <span className="font-semibold text-slate-700">{club.members} Members</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-icons text-slate-400">location_on</span>
                <span>{club.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-icons text-slate-400">schedule</span>
                <span>{club.schedule}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700" type="button">
                <span className="material-icons mr-2 text-lg">mail_outline</span>
                Contact Advisor
              </button>
              <button className="rounded-lg bg-sjcs-blue px-4 py-2 text-sm font-medium text-white" type="button">
                <span className="material-icons mr-2 text-lg">notifications_active</span>
                Subscribe
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <span className="material-icons text-sjcs-blue">campaign</span>
                Announcements
              </h2>
              <button className="text-sm font-medium text-sjcs-blue" type="button">
                Manage Posts
              </button>
            </div>

            {pinned ? (
              <article className="relative rounded-xl border-l-4 border-sjcs-blue bg-white p-6 shadow-sm">
                <div className="absolute right-4 top-4 text-sjcs-blue/40">
                  <span className="material-icons">push_pin</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">
                      {pinned.author}
                      <span className="ml-2 rounded-full bg-sjcs-blue/10 px-2 py-0.5 text-xs text-sjcs-blue">
                        {pinned.role}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500">{pinned.time}</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{pinned.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{pinned.summary}</p>
                    <div className="mt-4 flex gap-2">
                      {pinned.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ) : null}

            {otherAnnouncements.map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">
                      {item.author}
                      <span className="ml-2 text-slate-500">• {item.role}</span>
                    </p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.summary}</p>
                    <div className="mt-4 flex gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Club Details</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Advisor</span>
                  <span className="font-medium text-slate-900">{club.advisor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Category</span>
                  <span className="font-medium text-slate-900">{club.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Members</span>
                  <span className="font-medium text-slate-900">{club.members}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Schedule</span>
                  <span className="font-medium text-slate-900">{club.schedule}</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Upcoming Events</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-500">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">Robotics Workshop</p>
                  <p>Friday, 4:00 PM • Lab 2</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">State Prep Session</p>
                  <p>Saturday, 10:00 AM • Room 304</p>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default ClubDetailPage;
