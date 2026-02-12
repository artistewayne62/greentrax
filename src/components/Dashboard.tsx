<div className="dashboard">
  <nav className="tabs">
    {tabs.map(tab => (
      <button
        key={tab.id}
        className={activeTab === tab.id ? "active" : ""}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </nav>

  <div className="tab-content scrollable">
    {activeTab === "devices" && <MultiDeviceSimulator role={role} />}
    {activeTab === "gallery" && <MediaGallery />}
    {activeTab === "admin" && role === "admin" && (
      <div className="admin-tools">
        <h2>Admin Tools</h2>
        <p>Manage system settings, broadcast messages, oversee devices.</p>
      </div>
    )}
  </div>
</div>
