import { useState } from "react";
import { NavLink } from "react-router-dom";

const INK = "#131A2B";
const INK_SOFT = "#1E2740";
const AMBER = "#F5A524";
const TEAL = "#0FA3A3";
const CORAL = "#E5573F";
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

function Shell({ number, title, subtitle, children }) {
  return (
    <div className="min-h-[calc(100vh-57px)] flex items-start justify-center py-16 px-4" style={{ backgroundColor: PAPER }}>
      <div className="w-full max-w-md">
        <div className="flex items-baseline gap-3 mb-4 px-1">
          <span className="font-mono text-4xl font-bold" style={{ color: AMBER, WebkitTextStroke: `1px ${INK}` }}>
            {number}
          </span>
          <div>
            <h1 className="text-xl font-bold" style={{ color: INK }}>{title}</h1>
            <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500">{subtitle}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition";
const inputStyle = { "--tw-ring-color": AMBER };

function PrimaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full font-mono text-xs uppercase tracking-widest font-semibold rounded-md py-2.5 transition hover:brightness-95 active:scale-[0.99]"
      style={{ backgroundColor: AMBER, color: INK }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full font-mono text-xs uppercase tracking-widest font-semibold rounded-md py-2.5 border transition hover:bg-slate-50"
      style={{ borderColor: "#CBD2DE", color: "#4B5563" }}
    >
      {children}
    </button>
  );
}

function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div
      className="flex items-center gap-2 text-sm rounded-md px-3 py-2"
      style={{ backgroundColor: "#FDECE8", color: CORAL, border: `1px solid #F6C7BC` }}
    >
      <span className="font-mono font-bold">!</span> {message}
    </div>
  );
}

/* Terminal-style output block. `tone` drives the status dot: "good" | "warn" | "bad" | "neutral" */
function Output({ tone = "neutral", children }) {
  const dot = { good: TEAL, warn: AMBER, bad: CORAL, neutral: "#64748B" }[tone];
  return (
    <div className="rounded-md px-4 py-3 font-mono text-[13px]" style={{ backgroundColor: INK, color: "#E2E8F0" }}>
      <div className="flex items-center gap-2 mb-2 pb-2 border-b" style={{ borderColor: "#2A3452" }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dot }} />
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Result</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function OutputRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-100">{value}</span>
    </div>
  );
}

export default function ElectricityBill() {
  const [name, setName] = useState("");
  const [kwh, setKwh] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    if (!name.trim()) {
      setError("Please enter the customer's name.");
      setResult(null);
      return;
    }
    if (kwh === "" || isNaN(Number(kwh)) || Number(kwh) < 0) {
      setError("Please enter a valid consumption value.");
      setResult(null);
      return;
    }
    const consumption = Number(kwh);
    let rate;
    if (consumption <= 100) rate = 10;
    else if (consumption <= 200) rate = 12;
    else if (consumption <= 300) rate = 15;
    else rate = 18;

    const bill = consumption * rate;
    const high = bill >= 5000;
    const status = high ? "High Electricity Usage" : "Normal Electricity Usage";

    setError("");
    setResult({ name, consumption, rate, bill, status, tone: high ? "warn" : "good" });
  }

  function clear() {
    setName("");
    setKwh("");
    setError("");
    setResult(null);
  }

  return (
    <div>
      <Navbar />
      <Shell number="04" title="Electricity Bill Calculator" subtitle="Activity 4">
        <Field label="Customer Name">
          <input className={inputCls} style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter customer name" />
        </Field>
        <Field label="Consumption (kWh)">
          <input className={inputCls} style={inputStyle} value={kwh} onChange={(e) => setKwh(e.target.value)} placeholder="Enter consumption" />
        </Field>
        <ErrorBox message={error} />
        <PrimaryButton onClick={calculate}>Calculate Bill</PrimaryButton>
        <SecondaryButton onClick={clear}>Clear</SecondaryButton>
        {result && (
          <Output tone={result.tone}>
            <OutputRow label="Customer" value={result.name} />
            <OutputRow label="Consumption" value={`${result.consumption} kWh`} />
            <OutputRow label="Rate" value={`₱${result.rate}/kWh`} />
            <OutputRow label="Total Bill" value={`₱${result.bill.toLocaleString()}`} />
            <OutputRow label="Status" value={result.status} />
          </Output>
        )}
      </Shell>
    </div>
  );
}
