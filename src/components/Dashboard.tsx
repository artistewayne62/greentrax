import React, { useState } from "react";
import { useAuth } from "../core/auth/AuthContext";
import MediaGallery from "./MediaGallery";

const CommandConsole: React.FC = () => {
  const { role, roleLabel, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="h-screen flex flex-col bg-black text-white font-mono">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-700 px-6 py-3 flex justify-between items-center">
        <h1 className="text-green-500 font-black tracking-tight">
          GREENTRAX<span className="text-white opacity-30">.SYS</span>
        </h1>
        <div className="text-xs text-zinc-400">
          AUTH: {roleLabel.toUpperCase()} | {new Date().toLocaleTimeString()}
        </div>
        <button
          onClick={logout}
          className="text-red-400 hover:text-red-600 text-xs"
        >
          Logout
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-48 bg-zinc-950 border-r border-zinc-800 p-4 space-y-2">
          <NavButton label="Overview" tab="overview" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavButton label="Feeds" tab="feeds" activeTab={activeTab} setActiveTab={setActiveTab} />
          {role !== "guest" && (
            <NavButton label="Reports" tab="reports" activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          {role === "admin" && (
            <NavButton label="Admin Tools" tab="admin" activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold mb-4">System Overview</h2>
              <p>Welcome, {roleLabel}. Uplink secure. Monitoring active.</p>
            </div>
          )}
          {activeTab === "feeds" && <MediaGallery />}
          {activeTab === "reports" && <p>Reports module coming soon…</p>}
          {activeTab === "admin" && <p>Admin controls: restricted access.</p>}
        </main>
      </div>
    </div>
  );
};

const NavButton = ({ label, tab, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={`w-full text-left px-3 py-2 rounded ${
      activeTab === tab ? "bg-green-500/20 text-green-400" : "hover:bg-zinc-800 text-zinc-400"
    }`}
  >
    {label}
  </button>
);

export default Dashboard;
