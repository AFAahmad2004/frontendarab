import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GREEN = "#1B4D2E";
const GOLD  = "#C9A84C";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    if (!name || !email || !password || !confirm) { setError("يرجى تعبئة جميع الحقول"); return; }
    if (password !== confirm) { setError("كلمتا المرور غير متطابقتين"); return; }
    if (password.length < 6) { setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل"); return; }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) { login(data.token, data.role, data.name); navigate("/"); }
      else setError(data.error || "فشل إنشاء الحساب");
    } catch { setError("خطأ في الاتصال بالسيرفر"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7f5", direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
        <div style={{ background: `linear-gradient(135deg, ${GREEN}, #245f38)`, padding: "36px 32px", textAlign: "center" }}>
          <img src="/logo.png" alt="Arab Decoration" style={{ height: "70px", objectFit: "contain", marginBottom: "10px" }} onError={e => e.target.style.display = "none"} />
          <h2 style={{ margin: 0, color: GOLD, fontSize: "20px", fontWeight: "800" }}>إنشاء حساب جديد</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: "4px 0 0" }}>انضم إلى Arab Decoration</p>
        </div>
        <div style={{ background: "#fff", padding: "32px" }}>
          {error && <div style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "10px", padding: "10px 14px", marginBottom: "16px", color: "#c53030", fontSize: "13px" }}>⚠️ {error}</div>}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { p: "الاسم الكامل", v: name, s: setName, t: "text" },
              { p: "البريد الإلكتروني", v: email, s: setEmail, t: "email" },
              { p: "كلمة المرور", v: password, s: setPassword, t: "password" },
              { p: "تأكيد كلمة المرور", v: confirm, s: setConfirm, t: "password" },
            ].map((f, i) => (
              <input key={i} type={f.t} placeholder={f.p} value={f.v} onChange={e => f.s(e.target.value)}
                style={{ padding: "13px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", fontSize: "14px", outline: "none" }}
                onFocus={e => e.target.style.borderColor = GOLD}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            ))}
            <button onClick={handleRegister} disabled={loading} style={{
              padding: "13px", marginTop: "4px",
              background: loading ? "#ccc" : `linear-gradient(135deg, ${GREEN}, #245f38)`,
              color: loading ? "#888" : GOLD, border: "none", borderRadius: "10px",
              cursor: loading ? "not-allowed" : "pointer", fontSize: "15px", fontWeight: "800",
            }}>{loading ? "جاري الإنشاء..." : "إنشاء الحساب ✓"}</button>
          </div>
          <p style={{ textAlign: "center", marginTop: "18px", color: "#888", fontSize: "14px" }}>
            لديك حساب؟ <Link to="/login" style={{ color: GREEN, fontWeight: "700", textDecoration: "none" }}>تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
}