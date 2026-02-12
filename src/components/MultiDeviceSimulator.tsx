import React, { useState } from "react";

interface Device {
  id: number;
  name: string;
  messages: string[];
}

const MultiDeviceSimulator: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: "Device A", messages: [] },
    { id: 2, name: "Device B", messages: [] },
    { id: 3, name: "Device C", messages: [] },
  ]);

  const sendMessage = (senderId: number, text: string) => {
    setDevices(prev =>
      prev.map(device => ({
        ...device,
        messages:
          device.id === senderId
            ? [...device.messages, `You: ${text}`]
            : [...device.messages, `From Device ${senderId}: ${text}`],
      }))
    );
  };

  return (
    <div className="multi-sim">
      <h2>Multi-Device Simulator</h2>
      <div className="device-grid">
        {devices.map(device => (
          <div key={device.id} className="device-card">
            <h3>{device.name}</h3>
            <div className="messages">
              {device.messages.map((msg, i) => (
                <p key={i}>{msg}</p>
              ))}
            </div>
            <input
              type="text"
              placeholder="Type a message..."
              onKeyDown={e => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  sendMessage(device.id, e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiDeviceSimulator;
