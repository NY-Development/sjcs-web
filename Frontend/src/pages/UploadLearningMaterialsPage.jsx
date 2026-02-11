import { useState } from "react";
import RotatingLogo from "../components/RotatingLogo.jsx";

const recentUploads = [
  {
    id: "alg-worksheet",
    name: "Alg_Worksheet_Ch4.pdf",
    subject: "Math",
    size: "2.4 MB",
    status: "Published",
    icon: "description",
    tone: "blue"
  },
  {
    id: "solar-video",
    name: "Solar_System_Intro.mp4",
    subject: "Science",
    size: "45 MB",
    status: "Processing",
    icon: "smart_display",
    tone: "purple"
  },
  {
    id: "ww2",
    name: "WW2_Overview.pptx",
    subject: "History",
    size: "8.1 MB",
    status: "Published",
    icon: "slideshow",
    tone: "orange"
  },
  {
    id: "hamlet",
    name: "Hamlet_Act1.pdf",
    subject: "English",
    size: "1.2 MB",
    status: "Failed",
    icon: "description",
    tone: "red"
  },
  {
    id: "vocab",
    name: "Week_5_Vocab.docx",
    subject: "English",
    size: "0.8 MB",
    status: "Published",
    icon: "description",
    tone: "blue"
  }
];

const toneBadge = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600"
};

const statusBadge = {
  Published: "bg-green-100 text-green-700",
  Processing: "bg-amber-100 text-amber-700",
  Failed: "bg-red-100 text-red-700"
};

const UploadLearningMaterialsPage = () => {
  const [description, setDescription] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 md:flex-row">
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex items-center gap-3 p-6">
          <RotatingLogo className="flex h-10 w-10 items-center justify-center rounded-lg bg-sjcs-blue text-xl font-bold text-white shadow-lg shadow-blue-500/30" />
          <div>
            <h1 className="text-lg font-bold text-slate-900">SJCS</h1>
            <p className="text-xs text-slate-500">Teacher Portal</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
          {[
            { label: "Dashboard", icon: "dashboard" },
            { label: "My Classes", icon: "school" },
            { label: "Materials", icon: "folder_open", active: true },
            { label: "Assignments", icon: "assignment" },
            { label: "Schedule", icon: "calendar_today" }
          ].map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-sjcs-blue/10 text-sjcs-blue"
                  : "text-slate-600 hover:bg-sjcs-blue/5 hover:text-sjcs-blue"
              }`}
              type="button"
            >
              <span className="material-icons text-[20px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-50">
            <img
              alt="Teacher profile"
              className="h-8 w-8 rounded-full border border-slate-200"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp69VVcPJZx7KtPF10hm5kIklA4wgCoD7iA7GCGLREBV3kiR0TwNF2RRIcQ_xTlKivqAwVAk2tl1JXAtroX3r3gbbH1Zrbxp5n_8THQuxmO3pIUNzP_mhxYDwwtrAansVT0e5QHXb1Jvd2ta_U9s_Y1q-MmtlKhFws3iSfavEav_jde5Ad6j3LhxlKfIb0goVUZ0_n8IcAUaUD5HpLu4E5jGcjZ5YI0e42wmPqUdkbXrhtFQspBnkcoxeKY9beHF6UcRATSmqyP6gH"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">Sarah Miller</p>
              <p className="truncate text-xs text-slate-500">Science Dept.</p>
            </div>
            <span className="material-icons text-[18px] text-slate-400">more_vert</span>
          </div>
        </div>
      </aside>

      <main className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white p-4 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RotatingLogo className="flex h-8 w-8 items-center justify-center rounded-lg bg-sjcs-blue text-white font-bold" />
              <span className="font-bold text-slate-900">SJCS</span>
            </div>
            <button className="text-slate-500" type="button">
              <span className="material-icons">menu</span>
            </button>
          </div>
        </header>

        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
          <div>
            <nav className="mb-1 flex text-sm text-slate-500">
              <span className="hover:text-sjcs-blue">Home</span>
              <span className="mx-2 text-slate-300">/</span>
              <span className="hover:text-sjcs-blue">Courses</span>
              <span className="mx-2 text-slate-300">/</span>
              <span className="font-medium text-slate-900">Upload Materials</span>
            </nav>
            <h2 className="text-2xl font-bold text-slate-900">Upload Learning Materials</h2>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50" type="button">
            <span className="material-icons text-[18px]">help_outline</span>
            Help Guide
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7 xl:col-span-8">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <span className="material-icons text-sjcs-blue">cloud_upload</span>
                    New Material
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Select class details and upload files to distribute to students.</p>
                </div>
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {["Subject", "Class / Grade", "Material Type"].map((label) => (
                      <div key={label} className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">{label}</label>
                        <div className="relative">
                          <select className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue">
                            <option>Select {label}</option>
                            <option>Mathematics</option>
                            <option>Science</option>
                            <option>History</option>
                            <option>English Literature</option>
                          </select>
                          <span className="material-icons absolute right-3 top-3 text-[20px] text-slate-400">expand_more</span>
                        </div>
                      </div>
                    ))}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Publish Date</label>
                      <input
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                        type="date"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Description <span className="font-normal text-slate-400">(Optional)</span>
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-sjcs-blue focus:outline-none focus:ring-1 focus:ring-sjcs-blue"
                      placeholder="Add brief instructions for the students..."
                      rows="3"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>

                  <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sjcs-blue/30 px-6 pb-10 pt-10 text-center transition-all hover:border-sjcs-blue hover:bg-sjcs-blue/5">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sjcs-blue/5 text-sjcs-blue/40">
                      <span className="material-icons text-4xl">upload_file</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      <span className="rounded-md bg-white px-2 py-1 font-medium text-sjcs-blue">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-2 text-xs text-slate-500">PDF, DOC, MP4 up to 50MB</p>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-red-100 text-red-600">
                      <span className="material-icons">picture_as_pdf</span>
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-900">Chapter_4_Review.pdf</span>
                        <span className="text-xs text-slate-500">85%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-200">
                        <div className="h-1.5 rounded-full bg-sjcs-blue" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-red-500" type="button">
                      <span className="material-icons text-[20px]">close</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-2">
                    <button className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100" type="button">
                      Cancel
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-sjcs-blue px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/20" type="button">
                      <span className="material-icons text-[18px]">publish</span>
                      Upload Material
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-5 xl:col-span-4">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-sjcs-blue to-blue-600 p-6 text-white shadow-lg">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                <div className="relative z-10">
                  <h4 className="text-sm font-medium text-blue-100">Total Storage Used</h4>
                  <div className="mb-4 mt-2 flex items-end gap-2">
                    <span className="text-3xl font-bold">12.4 GB</span>
                    <span className="text-sm text-blue-100">/ 50 GB</span>
                  </div>
                  <div className="mb-2 h-2 w-full rounded-full bg-black/20">
                    <div className="h-2 rounded-full bg-white" style={{ width: "25%" }} />
                  </div>
                  <p className="text-xs text-blue-100">You have plenty of space left.</p>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                  <h3 className="font-semibold text-slate-900">Recent Uploads</h3>
                  <button className="text-sm font-medium text-sjcs-blue hover:underline" type="button">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-medium">File Name</th>
                        <th className="px-4 py-3 text-center font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {recentUploads.map((file) => (
                        <tr key={file.id} className="transition-colors hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`rounded p-1.5 ${toneBadge[file.tone]}`}>
                                <span className="material-icons text-[18px]">{file.icon}</span>
                              </div>
                              <div>
                                <div className="font-medium text-slate-900">{file.name}</div>
                                <div className="text-xs text-slate-500">
                                  {file.subject} • {file.size}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusBadge[file.status]}`}>
                              {file.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button className="text-slate-400 hover:text-sjcs-blue" type="button">
                              <span className="material-icons text-[20px]">more_vert</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadLearningMaterialsPage;
