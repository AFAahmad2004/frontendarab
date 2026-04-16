import React, { useState } from "react";

const GREEN = "#1B4D2E";
const GOLD  = "#C9A84C";
const GOLD2 = "#e8c96a";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    setLoading(true);
    try {
      const res = await fetch("https://arab-decoration-backend.onrender.com", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("servererror"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif", background: "#f5f7f5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${GREEN}, #245f38)`, padding: "48px 24px", textAlign: "center" }}>
        <img src="/logo.png" alt="Arab Decoration" style={{ height: "70px", marginBottom: "12px" }} onError={e => e.target.style.display = "none"} />
        <h1 style={{ color: GOLD, margin: "0 0 6px", fontSize: "26px", fontWeight: "900" }}>تواصل معنا</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>يسعدنا الرد على استفساراتك</p>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "36px" }}>
          {[
            { icon: "🏢", label: "المهنس المعماري : حمزة عرب",     value: "269 897 956 963+" },
            { icon: "🏢", label: "مدير المشاريع : عقبة عرب",     value: "287 462 951 963+" },
            { icon: "📧", label: "البريد",      value: "hamzaarab987@gmail.com" },
            { icon: "📍", label: "الموقع",      value: "ادلب / ارمناز - لدينا تنفيذ في جميع المحافظات السورية" },
            { icon: "🚚", label: "الخدمات ", value: "خدمة شحن البضائع" },
          ].map(item => (
            <div key={item.label} style={{ padding: "18px", background: "#fff", border: `1px solid #e8ede8`, borderRadius: "14px", borderTop: `3px solid ${GOLD}` }}>
              <span style={{ fontSize: "22px" }}>{item.icon}</span>
              <p style={{ color: GREEN, fontSize: "12px", fontWeight: "700", margin: "8px 0 4px" }}>{item.label}</p>
              <p style={{ color: "#555", fontSize: "13px", margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>

    
      </div>
    </div>
  );
}
