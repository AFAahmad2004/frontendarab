import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { id: "kitchens",  label: "مطابخ",           icon: "🍳", img: "/cat-kitchens.jpg" },
  { id: "bedrooms",  label: "غرف نوم",          icon: "🛏️", img: "/cat-bedrooms.jpg" },
  { id: "living",    label: "غرف معيشة",        icon: "🛋️", img: "/cat-living.jpg" },
  { id: "offices",   label: "مكاتب",            icon: "🪑" ,img:"/cat-offices.jpg"},
  { id: "bathrooms", label: "حمامات",           icon: "🚿", img: "/cat-bathrooms.jpg" },
  { id: "outdoor",   label: "خارجي",            icon: "🌿",img:"/cat-outdoor.jpg" },
  { id: "tv-decor",  label: "ديكورات شاشة",     icon: "📺", img: "/cat-tv-decor.jpg" },
  { id: "plans-2d",       label: "مخططات 2D",          icon: "📐",img:"/cat-plans-2d.jpg" },
  { id: "facades",   label: "واجهات خارجية",    icon: "🏛️", img: "/cat-facades.jpg" },
  { id: "cladding",  label: "مواد الإكساء",     icon: "🪵",img:"/cat-cladding.jpg" },
];

const GREEN = "#022e13";
const GOLD  = "#C9A84C";
const GOLD2 = "#e8c96a";

export default function Home() {
  const [updates, setUpdates] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      fetch("https://arab-decoration-backend.onrender.com/updates").then(r => r.json()).catch(() => []),
      fetch("https://arab-decoration-backend.onrender.com/products?home=1").then(r => r.json()).catch(() => []),
    ]).then(([u, p]) => { setUpdates(u); setFeaturedProducts(p); setLoading(false); });
  }, []);

  return (
    <div style={{ direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif", background: "#f5f7f5", minHeight: "100vh" }}>

      {/* ===== HERO ===== */}
      <div style={{
        background: `linear-gradient(135deg, ${GREEN} 0%, #0b5523 60%, #017427 100%)`,
        padding: "80px 24px 100px",
        textAlign: "center", color: "#fff",
        position: "relative", overflow: "hidden",
      }}>
  

        <div style={{ position: "relative", marginBottom: "20px" }}>
          <img src="/logo.png" alt="Arab Decoration" style={{ height: "200px", objectFit: "contain", filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.3))" }}
            onError={e => e.target.style.display = "none"} />
        </div>

        <h1 style={{ fontSize: "40px", margin: "0 0 8px", fontWeight: "900", color: GOLD, letterSpacing: "1px", position: "relative" }}>
          ARAB DECORATION
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "17px", margin: "0 0 32px", position: "relative" }}>
          أثاث وديكور فاخر لكل ركن من منزلك
        </p>

        <div style={{ width: "60px", height: "3px", background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`, borderRadius: "2px", margin: "0 auto 32px", position: "relative" }} />

        <button onClick={() => navigate("/products/kitchens")} style={{
          padding: "14px 40px",
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
          color: GREEN, border: "none", borderRadius: "30px",
          cursor: "pointer", fontWeight: "800", fontSize: "16px",
          boxShadow: `0 4px 20px rgba(201,168,76,0.4)`,
          position: "relative", transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          تصفح المنتجات ←
        </button>

        <svg viewBox="0 0 1440 60" style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%" }} preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#f5f7f5" />
        </svg>
      </div>

      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "48px 24px" }}>

        {/* ===== CATEGORIES ===== */}
        <section style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "4px", height: "24px", background: `linear-gradient(180deg, ${GOLD}, ${GOLD2})`, borderRadius: "2px" }} />
            <h2 style={{ color: GREEN, margin: 0, fontSize: "24px", fontWeight: "800" }}>الأقسام</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "14px" }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => navigate(`/products/${cat.id}`)} style={{
                padding: 0, background: "#fff",
                border: `2px solid transparent`,
                borderRadius: "16px", cursor: "pointer", textAlign: "center",
                transition: "all 0.2s", overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 20px rgba(201,168,76,0.25)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; }}
              >
                {cat.img ? (
                  <div style={{ width: "100%", height: "110px", overflow: "hidden", position: "relative" }}>
                    <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40px", background: "linear-gradient(transparent, rgba(0,0,0,0.18))" }} />
                  </div>
                ) : (
                  <div style={{ width: "100%", height: "110px", background: `linear-gradient(135deg, #e8f0e8, #d4e4d4)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "42px" }}>
                    {cat.icon}
                  </div>
                )}
                <div style={{ padding: "10px 12px" }}>
                  <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: GREEN }}>{cat.label}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ===== FEATURED PRODUCTS ===== */}
        {featuredProducts.length > 0 && (
          <section style={{ marginBottom: "56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "4px", height: "24px", background: `linear-gradient(180deg, ${GOLD}, ${GOLD2})`, borderRadius: "2px" }} />
              <h2 style={{ color: GREEN, margin: 0, fontSize: "24px", fontWeight: "800" }}>منتجات مميزة</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "18px" }}>
              {featuredProducts.map(p => (
                <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{
                  background: "#fff", borderRadius: "16px", overflow: "hidden",
                  border: `1px solid #e8ede8`,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 12px 28px rgba(27,77,46,0.15)`; e.currentTarget.style.borderColor = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = "#e8ede8"; }}
                >
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} style={{ width: "100%", height: "170px", objectFit: "cover" }} />
                  ) : (
                    <div style={{ height: "130px", background: `linear-gradient(135deg, #e8f0e8, #d4e4d4)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>📦</div>
                  )}
                  <div style={{ height: "3px", background: `linear-gradient(90deg, ${GREEN}, ${GOLD})` }} />
                  <div style={{ padding: "16px" }}>
                    <p style={{ margin: "0 0 5px", fontWeight: "700", color: GREEN, fontSize: "15px" }}>{p.name}</p>
                    <p style={{ margin: 0, color: GOLD, fontWeight: "800", fontSize: "15px" }}>{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===== UPDATES ===== */}
        {updates.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "4px", height: "24px", background: `linear-gradient(180deg, ${GOLD}, ${GOLD2})`, borderRadius: "2px" }} />
              <h2 style={{ color: GREEN, margin: 0, fontSize: "24px", fontWeight: "800" }}>آخر الأخبار</h2>
            </div>
            {loading ? <p style={{ color: "#aaa" }}>⏳ جاري التحميل...</p> : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {updates.map(u => (
                  <div key={u.id} style={{ background: "#fff", border: `1px solid #e8ede8`, padding: "18px 20px", borderRadius: "14px", borderRight: `4px solid ${GOLD}` }}>
                    <h3 style={{ margin: "0 0 6px", color: GREEN, fontSize: "16px" }}>{u.title}</h3>
                    <p style={{ margin: "0 0 8px", color: "#555", fontSize: "14px" }}>{u.content}</p>
                    <small style={{ color: "#aaa" }}>🕒 {u.date}</small>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ===== CTA Banner ===== */}
        <div style={{
          marginTop: "56px", padding: "40px 32px",
          background: `linear-gradient(135deg, ${GREEN}, #245f38)`,
          borderRadius: "20px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(45deg, ${GOLD} 0, ${GOLD} 1px, transparent 0, transparent 50%)`, backgroundSize: "20px 20px" }} />
          <img src="/logo.png" alt="" style={{ height: "60px", marginBottom: "12px", opacity: 0.9 }} onError={e => e.target.style.display = "none"} />
          <h3 style={{ color: GOLD, margin: "0 0 8px", fontSize: "22px", fontWeight: "800", position: "relative" }}>هل تحتاج إلى استشارة؟</h3>
          <p style={{ color: "rgba(255,255,255,0.7)", margin: "0 0 20px", fontSize: "15px", position: "relative" }}>فريقنا جاهز لمساعدتك في اختيار الأنسب لمنزلك</p>
          <button onClick={() => navigate("/contact")} style={{
            padding: "12px 32px", background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
            color: GREEN, border: "none", borderRadius: "25px",
            cursor: "pointer", fontWeight: "800", fontSize: "15px", position: "relative",
          }}>تواصل معنا الآن</button>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: GREEN, padding: "24px", textAlign: "center", marginTop: "20px" }}>
        <img src="/logo.png" alt="Arab Decoration" style={{ height: "44px", marginBottom: "8px" }} onError={e => e.target.style.display = "none"} />
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", margin: 0 }}>© 2025 Arab Decoration — جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}