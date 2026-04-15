import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GREEN = "#1B4D2E";
const GOLD  = "#C9A84C";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("يرجى تعبئة جميع الحقول"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        login(data.token, data.role, data.name);
        navigate(data.role === "admin" ? "/admin" : "/");
      } else {
        setError(data.error || "بيانات خاطئة");
      }
    } catch { setError("خطأ في الاتصال بالسيرفر"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7f5", direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${GREEN}, #245f38)`, padding: "36px 32px", textAlign: "center" }}>
          <img src="/logo.png" alt="Arab Decoration" style={{ height: "70px", objectFit: "contain", marginBottom: "10px" }} onError={e => e.target.style.display = "none"} />
          <h2 style={{ margin: 0, color: GOLD, fontSize: "20px", fontWeight: "800" }}>تسجيل الدخول</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: "4px 0 0" }}>مرحباً بك مجدداً</p>
        </div>

        {/* Form */}
        <div style={{ background: "#fff", padding: "32px" }}>
          {error && <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px", color: "#c53030", fontSize: "13px" }}>⚠️ {error}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)}
              style={{ padding: "13px 16px", borderRadius: "10px", border: `1px solid #e2e8f0`, fontSize: "14px", outline: "none" }}
              onFocus={e => e.target.style.borderColor = GOLD}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
            <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ padding: "13px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none" }}
              onFocus={e => e.target.style.borderColor = GOLD}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />
            <button onClick={handleLogin} disabled={loading} style={{
              padding: "13px", marginTop: "4px",
              background: loading ? "#ccc" : `linear-gradient(135deg, ${GREEN}, #245f38)`,
              color: loading ? "#888" : GOLD, border: "none", borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer", fontSize: "15px", fontWeight: "800",
            }}>{loading ? "جاري الدخول..." : "دخول"}</button>
          </div>
          <p style={{ textAlign: "center", marginTop: "18px", color: "#888", fontSize: "14px" }}>
            ليس لديك حساب؟ <Link to="/register" style={{ color: GREEN, fontWeight: "700", textDecoration: "none" }}>إنشاء حساب</Link>
          </p>
        </div>
      </div>
    </div>
  );
}