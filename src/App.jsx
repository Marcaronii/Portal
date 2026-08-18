import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import GradeEvaluation from "./pages/GradeEvaluation.jsx";
import PasswordChecker from "./pages/PasswordChecker.jsx";
import ElectricityBill from "./pages/ElectricityBill.jsx";
import AttendanceChecker from "./pages/AttendanceChecker.jsx";

const INK = "#131A2B";
const INK_SOFT = "#1E2740";
const AMBER = "#F5A524";
const PAPER = "#F3F4F7";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/activity-1", label: "Login" },
  { to: "/activity-2", label: "Grades" },
  { to: "/activity-3", label: "Password" },
  { to: "/activity-4", label: "Bill" },
  { to: "/activity-5", label: "Attendance" },
];

function Navbar() {
  return (
    <div className="border-b" style={{ backgroundColor: INK, borderColor: "#2A3452" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3.5 px-6">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[13px] tracking-widest text-slate-100 uppercase">
            React Activity Portal
          </span>
        </div>
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `font-mono text-[11px] tracking-wide uppercase px-3 py-1.5 rounded transition ${
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-100"
                }`
              }
              style={({ isActive }) => (isActive ? { backgroundColor: INK_SOFT, boxShadow: `inset 0 -2px 0 ${AMBER}` } : {})}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

const ACTIVITY_META = [
  {
    id: "01",
    path: "/activity-1",
    title: "Login Authentication",
    desc: "Validate a username and password against sample credentials and manage login/logout state.",
    tags: ["useState", "onSubmit", "validation"],
  },
  {
    id: "02",
    path: "/activity-2",
    title: "Student Grade Evaluation",
    desc: "Enter a student's score and get an automatic remark based on grade ranges.",
    tags: ["useState", "if/else", "conditional render"],
  },
  {
    id: "03",
    path: "/activity-3",
    title: "Password Strength Checker",
    desc: "Check password length and receive live feedback on how strong it is.",
    tags: ["useState", "string length", "conditional render"],
  },
  {
    id: "04",
    path: "/activity-4",
    title: "Electricity Bill Calculator",
    desc: "Calculate a customer's electricity bill based on kWh consumption and tiered rates.",
    tags: ["useState", "calculations", "multiple conditions"],
  },
  {
    id: "05",
    path: "/activity-5",
    title: "Employee Attendance Checker",
    desc: "Check an employee's time-in and determine whether they are on time, late, or very late.",
    tags: ["multiple useState", "numeric validation", "if/else"],
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: PAPER }} className="min-h-[calc(100vh-57px)]">
        <div style={{ backgroundColor: INK }} className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate-400 mb-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: AMBER }} />
              5 activities · 1 codebase
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              React Activity Portal
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
              A set of small, self-contained React exercises — state, events, conditional
              logic, validation, and calculations — each built as its own page.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-10 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACTIVITY_META.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <span className="font-mono text-2xl font-bold mb-4" style={{ color: AMBER, WebkitTextStroke: `1px ${INK}` }}>
                  {a.id}
                </span>
                <h3 className="font-semibold text-slate-900 mb-1.5">{a.title}</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1 leading-relaxed">{a.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded text-slate-500"
                      style={{ backgroundColor: PAPER }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate(a.path)}
                  className="w-full font-mono text-xs uppercase tracking-widest font-semibold rounded-md py-2.5 transition hover:brightness-95"
                  style={{ backgroundColor: INK, color: "white" }}
                >
                  Open Activity →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/activity-1" element={<Login />} />
      <Route path="/activity-2" element={<GradeEvaluation />} />
      <Route path="/activity-3" element={<PasswordChecker />} />
      <Route path="/activity-4" element={<ElectricityBill />} />
      <Route path="/activity-5" element={<AttendanceChecker />} />
    </Routes>
  );
}
