import React from "react";
import { useAuth } from "../context/AuthContext";

export default function ClientDashboard() {
  const { auth } = useAuth();

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>📋 Client Dashboard</h2>
      <div style={{ background: "#f0f9ff", padding: "20px", borderRadius: "10px", border: "1px solid #bee3f8" }}>
        <p>👋 Welcome, <strong>{auth?.name}</strong>!</p>
        <p style={{ color: "#555" }}>You are logged in as a <strong>client</strong>.</p>
      </div>
    </div>
  );
}
