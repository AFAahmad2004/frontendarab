import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // روابط الناف بار - تُخفى على الجوال وتنقل للسايدبار
  const navLinks = [
    { to: "/", label: "الرئيسية" },
    ...(auth?.role === "admin" ? [{ to: "/admin", label: "الإدارة" }] : []),
    ...(auth?.role === "client" ? [{ to: "/client", label: "لوحتي" }] : []),
    { to: "/contact", label: "تواصل معنا" },
  ];

  return (
    <>
      <nav style={{
        padding: "0 24px",
        height: "72px",
        background: "linear-gradient(90deg, #1B4D2E 0%, #245f38 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        direction: "rtl",
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.png"
            alt="Arab Decoration"
            style={{ height: isMobile ? "72px" : "72px", objectFit: "contain", transition: "height 0.2s" }}
            onError={e => { e.target.style.display = "none"; }}
          />
          {/* اسم الشركة فقط بدون "ديكور عربي" */}
          <div style={{
            color: "#C9A84C",
            fontWeight: "800",
            fontSize: isMobile ? "15px" : "18px",
            letterSpacing: "0.5px",
            lineHeight: "1.1",
          }}>
            ARAB DECORATION
          </div>
        </Link>

        {/* Center Links — تُخفى على الجوال */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} style={{
                color: "rgba(255,255,255,0.85)", textDecoration: "none",
                fontSize: "15px", fontWeight: "600",
                padding: "4px 0",
                borderBottom: "2px solid transparent",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.target.style.color = "#C9A84C"; e.target.style.borderBottomColor = "#C9A84C"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.85)"; e.target.style.borderBottomColor = "transparent"; }}
              >{link.label}</Link>
            ))}
          </div>
        )}

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {auth ? (
            <>
              {!isMobile && (
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>👤 {auth.name}</span>
              )}
              {!isMobile && (
                <button onClick={handleLogout} style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff", padding: "7px 16px",
                  borderRadius: "8px", cursor: "pointer", fontSize: "14px",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,0,0,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                >خروج</button>
              )}
            </>
          ) : (
            <>
              {!isMobile && (
                <>
                  <Link to="/login" style={{
                    color: "rgba(255,255,255,0.85)", textDecoration: "none",
                    fontSize: "14px", padding: "7px 16px",
                    border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px",
                  }}>دخول</Link>
                  <Link to="/register" style={{
                    color: "#1B4D2E", textDecoration: "none",
                    fontSize: "14px", padding: "7px 16px",
                    background: "#C9A84C", borderRadius: "8px", fontWeight: "700",
                  }}>تسجيل</Link>
                </>
              )}
            </>
          )}

          {/* Sidebar Toggle — دائماً ظاهر */}
          <button onClick={() => setSidebarOpen(true)} style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "#C9A84C", width: "44px", height: "44px",
            borderRadius: "10px", cursor: "pointer",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "5px",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.15)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >
            <span style={{ width: "18px", height: "2px", background: "#C9A84C", borderRadius: "2px", display: "block" }} />
            <span style={{ width: "13px", height: "2px", background: "#C9A84C", borderRadius: "2px", display: "block" }} />
            <span style={{ width: "18px", height: "2px", background: "#C9A84C", borderRadius: "2px", display: "block" }} />
          </button>
        </div>
      </nav>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
    </>
  );
}