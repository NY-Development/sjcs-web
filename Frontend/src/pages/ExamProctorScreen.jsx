import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import ExamProctor from "./ExamProctor";

const MAX_WARNINGS = 3;

const ExamProctorScreen = () => {
  const [violationCount, setViolationCount] = useState(0);
  const [headWarning, setHeadWarning] = useState(false);
  const [compliant, setCompliant] = useState(true);
  const navigate = useNavigate();

  // Handler for ExamProctor child
  const handleViolationChange = (count) => {
    setViolationCount(count);
    setCompliant(count < MAX_WARNINGS);
    if (count >= MAX_WARNINGS) {
      alert("Maximum violations reached. Exam will be auto-submitted.");
      navigate("/exam/submit");
    }
  };
  const handleHeadWarningChange = (warning) => {
    setHeadWarning(warning);
    setCompliant(!warning && violationCount < MAX_WARNINGS);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 flex flex-col select-none">
      <header className="bg-white dark:bg-slate-900 border-b border-red-500 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400">
                <span className="material-icons">gavel</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">SJCS Exam Mode</h1>
                <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Live Proctoring Active
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Alex Johnson</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">ID: 98765432</p>
              </div>
              <img alt="Student Profile Picture" className="h-9 w-9 rounded-full object-cover border-2 border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAw7lyliBKOoVS8Fugj3y5t682j6kjAzanwMWDey8bqH6UIfdWdfSLjJGL01tVofFvb0t7mu53SxFCP0FmRExk9IHWoAxcyjVExQ8-J6ZCj94fGbIglndBc5Icqfp1ZzYR6Tmktc9LXOYFomFHNmBcNn1GGosL90FPH1II40cxv3rY8LPK2rA9Dktza00W39yIsWRuQf3FfRIUekxwcp6qY1A2miKHX81i35trM-OPcyKp-12P7lh3ryizgLmdPZn4CXenbdmlFmdGg" />
            </div>
          </div>
        </div>
      </header>
      <main className="grow py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 h-full">
        <aside className="w-full lg:w-1/4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-icons text-slate-400 text-sm">videocam</span>
                Security Dashboard
              </h3>
              <span className="text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-1 rounded-full uppercase tracking-wider">Local Processing</span>
            </div>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-green-500 pulse-border bg-slate-200 dark:bg-slate-900 flex items-center justify-center grayscale">
              <ExamProctor
                onViolationChange={handleViolationChange}
                onHeadWarningChange={handleHeadWarningChange}
                containerClassName="h-full w-full"
              />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Proctoring Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Status:</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${compliant ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                  <span className="material-icons text-[12px]">{compliant ? "check_circle" : "warning"}</span> {compliant ? "Compliant" : "Violation"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Warnings:</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">{violationCount} / {MAX_WARNINGS}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Audio:</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1">
                  <span className="material-icons text-[14px] text-green-500">mic</span> Monitoring
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Screen:</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1">
                  <span className="material-icons text-[14px] text-green-500">desktop_windows</span> Captured
                </span>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800/50 p-4">
            <div className="flex items-start gap-3">
              <span className="material-icons text-yellow-600 dark:text-yellow-500 mt-0.5">warning</span>
              <div>
                <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-500">Important Notice</h4>
                <p className="text-xs text-yellow-700 dark:text-yellow-600/90 mt-1 leading-relaxed">
                  Focus enforcement is active. Navigating away from this tab or opening other applications will result in an immediate warning. Three warnings will auto-submit your exam.
                </p>
              </div>
            </div>
          </div>
        </aside>
        <section className="w-full lg:w-3/4 flex flex-col">
          <div className="bg-white dark:bg-slate-800 rounded-t-xl border border-slate-200 dark:border-slate-700 p-6 border-b-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Mathematics</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Mock Exam - Section 2</p>
            </div>
            <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800/50">
              <span className="material-icons text-red-600 dark:text-red-400">timer</span>
              <div>
                <p className="text-[10px] text-red-600/80 dark:text-red-400/80 font-bold uppercase tracking-wider leading-none">Time Remaining</p>
                <p className="text-xl font-mono font-bold text-red-600 dark:text-red-400 leading-tight">01:45:12</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 border-x border-slate-200 dark:border-slate-700 p-6 sm:p-10 grow flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-700 pb-4">
              <span className="text-sm font-semibold text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Question 12 of 30</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">Multiple Choice (2 points)</span>
            </div>
            <div className="mb-8">
              <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                Find the roots of the quadratic equation:
              </p>
              <div className="my-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-100 dark:border-slate-700 text-center">
                <p className="text-2xl font-serif text-slate-900 dark:text-white italic">2x² - 5x + 3 = 0</p>
              </div>
            </div>
            <div className="space-y-4 max-w-2xl">
              <label className="flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <input className="w-5 h-5 text-primary border-slate-300 focus:ring-primary dark:border-slate-600 dark:bg-slate-700" name="q12" type="radio" value="a" />
                <span className="ml-4 text-base text-slate-700 dark:text-slate-300">x = 1, x = 1.5</span>
              </label>
              <label className="flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <input className="w-5 h-5 text-primary border-slate-300 focus:ring-primary dark:border-slate-600 dark:bg-slate-700" name="q12" type="radio" value="b" />
                <span className="ml-4 text-base text-slate-700 dark:text-slate-300">x = -1, x = -1.5</span>
              </label>
              <label className="flex items-center p-4 border-2 border-primary bg-blue-50 dark:bg-blue-900/10 rounded-lg cursor-pointer">
                <input checked className="w-5 h-5 text-primary border-slate-300 focus:ring-primary dark:border-slate-600 dark:bg-slate-700" name="q12" type="radio" value="c" />
                <span className="ml-4 text-base font-medium text-primary dark:text-blue-400">x = 1.5, x = 1</span>
              </label>
              <label className="flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <input className="w-5 h-5 text-primary border-slate-300 focus:ring-primary dark:border-slate-600 dark:bg-slate-700" name="q12" type="radio" value="d" />
                <span className="ml-4 text-base text-slate-700 dark:text-slate-300">x = 2, x = 3</span>
              </label>
            </div>
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
              <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium flex items-center gap-1 transition-colors focus:outline-none">
                <span className="material-icons text-sm">flag</span>
                Flag for review
              </button>
              <button className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 text-sm font-medium flex items-center gap-1 transition-colors focus:outline-none">
                <span className="material-icons text-sm">clear_all</span>
                Clear selection
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-b-xl border border-slate-200 dark:border-slate-700 p-6 flex justify-between items-center shadow-sm">
            <button className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 flex items-center gap-2">
              <span className="material-icons text-sm">arrow_back</span>
              Previous
            </button>
            <div className="flex items-center gap-4">
              <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium hidden sm:block">
                Question Navigator
              </button>
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors flex items-center gap-2">
                Next Question
                <span className="material-icons text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* Warning overlay handled inside ExamProctor */}
    </div>
  );
};

export default ExamProctorScreen;