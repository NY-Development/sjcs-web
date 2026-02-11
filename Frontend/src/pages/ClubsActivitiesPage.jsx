import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";

const fallbackClubs = [
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

const categoryChips = ["All Clubs", "Academic", "Sports", "Arts", "Leadership", "STEM", "Service"];

const toneStyles = {
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-purple-50 text-purple-700",
  green: "bg-green-50 text-green-700",
  pink: "bg-pink-50 text-pink-700",
  amber: "bg-amber-50 text-amber-700"
};

const ClubsActivitiesPage = () => {
  const { accessToken } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState("All Clubs");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: clubsData = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => (await api.get("/clubs")).data.data || [],
    enabled: Boolean(accessToken)
  });

  const clubs = clubsData.length ? clubsData : fallbackClubs;

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesCategory =
        selectedCategory === "All Clubs" || club.category === selectedCategory;
      const matchesSearch =
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [clubs, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-sjcs-blue text-white font-bold">S</div>
              <span className="font-bold text-lg text-slate-900">SJCS Portal</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
              <span>Dashboard</span>
              <span>Academics</span>
              <span className="text-sjcs-blue font-semibold">Clubs</span>
              <span>Events</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-400 hover:text-slate-600" type="button">
              <span className="material-icons text-xl">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2">
              <img
                alt="Student profile"
                className="h-8 w-8 rounded-full object-cover border border-slate-200"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8ED9ldpOkzOp2AQZSr5U6-Apg3JAKMKL4T4cdpqlVjbSL8T-th-UCDbt6jRKeFOGPlu9k19lbRrR7fXFRtW63tI8xxGZ233LsDZ1MWRuAknxPhthd2vEpAbd4zQ9vcsg7RHpOPZ3xNq1mie3D52wYl3zrj1neCmgIzPDwxfuGl1qu96aNBUpBnKYSkuDihzlLfAdLWixGhuR6OK5U8O36mSOkDgS3GxshP9YUCKt2XvQ8XHOZH6Ez9F0p6q9xWLFjOzmMaTpCk-gc"
              />
              <span className="hidden md:block text-sm font-medium text-slate-700">Alex Student</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="border-b border-slate-200 bg-white pb-12 pt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Clubs & Activities</h1>
                <p className="mt-2 max-w-2xl text-lg text-slate-500">
                  Discover your passion at SJCS. Join one of our 30+ student-led organizations and make your mark.
                </p>
              </div>
              <div className="relative w-full max-w-md">
                <span className="material-icons absolute left-3 top-3 text-slate-400">search</span>
                <input
                  className="w-full rounded-md border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-sjcs-blue/40"
                  placeholder="Search clubs (e.g. Debate, Robotics...)"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </div>
            <div className="mt-8 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-4 pb-3">
                <h3 className="text-base font-semibold text-slate-900">Categories</h3>
                <div className="flex flex-1 gap-4 overflow-x-auto">
                  {categoryChips.map((chip) => (
                    <button
                      key={chip}
                      className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium transition-colors ${
                        selectedCategory === chip
                          ? "border-sjcs-blue text-sjcs-blue"
                          : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                      onClick={() => setSelectedCategory(chip)}
                      type="button"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.map((club) => (
              <div
                key={club.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  {club.image ? (
                    <img
                      alt={club.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={club.image}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-300">
                      <span className="material-icons text-6xl">account_balance</span>
                    </div>
                  )}
                  <span
                    className={`absolute right-3 top-3 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      toneStyles[club.tone] || "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {club.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold text-slate-900">{club.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{club.description}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-base text-slate-400">group</span>
                      {club.members} Members
                    </div>
                    <div className="flex -space-x-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-medium text-slate-500">
                        +{Math.max(club.members - 2, 2)}
                      </span>
                    </div>
                  </div>
                  <Link
                    className={`mt-4 inline-flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      club.cta === "Application Closed"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-sjcs-blue/10 text-sjcs-blue hover:bg-sjcs-blue hover:text-white"
                    }`}
                    to={`/clubs/${club.id}`}
                  >
                    {club.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClubsActivitiesPage;
