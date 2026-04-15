import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = {
  kitchens:  { label: "مطابخ",           icon: "🍳" },
  bedrooms:  { label: "غرف نوم",          icon: "🛏️" },
  living:    { label: "غرف معيشة",        icon: "🛋️" },
  offices:   { label: "مكاتب",            icon: "🪑" },
  bathrooms: { label: "حمامات",           icon: "🚿" },
  outdoor:   { label: "خارجي",            icon: "🌿" },
  "tv-decor":{ label: "ديكورات شاشة",    icon: "📺" },
  "plans-2d":{ label: "مخططات 2D",       icon: "📐" },
  facades:   { label: "واجهات خارجية",   icon: "🏛️" },
  cladding:  { label: "مواد الإكساء",    icon: "🪵" },
};

const GREEN = "#1B4D2E";
const GOLD  = "#C9A84C";

export default function Products() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites") || "[]"));
  const [added, setAdded] = useState(null);
  const catInfo = CATEGORIES[category];

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/products?category=${category}`)
      .then(r => r.json())
      .then(d => { setProducts(d); setLoading(false); })
      .catch(() => { setError("تعذر تحميل المنتجات"); setLoading(false); });
  }, [category]);

  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    if (!auth) { navigate("/login"); return; }
    const exists = favorites.find(f => f.id === product.id);
    const updated = exists ? favorites.filter(f => f.id !== product.id) : [...favorites, product];
    if (!exists) { setAdded(product.id); setTimeout(() => setAdded(null), 1500); }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!catInfo) return (
    <div style={{ padding: "60px", textAlign: "center", direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      <p style={{ fontSize: "48px" }}>🔍</p>
      <h2 style={{ color: "#555" }}>القسم غير موجود</h2>
      <button onClick={() => navigate("/")} style={{ marginTop: "16px", padding: "10px 24px", background: GREEN, border: "none", borderRadius: "10px", cursor: "pointer", color: GOLD, fontWeight: "700" }}>الرئيسية</button>
    </div>
  );

  return (
    <div style={{ direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif", background: "#f5f7f5", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${GREEN}, #245f38)`, padding: "40px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "15px", marginBottom: "10px", padding: 0 }}>← رجوع</button>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "36px" }}>{catInfo.icon}</span>
            <div>
              <h1 style={{ margin: 0, fontSize: "28px", color: GOLD, fontWeight: "900" }}>{catInfo.label}</h1>
              <p style={{ color: "rgba(255,255,255,0.55)", margin: "4px 0 0", fontSize: "14px" }}>{products.length} منتج متاح</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "36px 24px" }}>
        {loading && <div style={{ textAlign: "center", padding: "60px", color: "#aaa" }}><p style={{ fontSize: "36px" }}>⏳</p><p>جاري التحميل...</p></div>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && products.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "#aaa" }}>
            <p style={{ fontSize: "48px" }}>📦</p>
            <p style={{ fontSize: "15px" }}>لا توجد منتجات في هذا القسم بعد</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
          {products.map(product => (
            <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} style={{
              background: "#fff", border: `1px solid #e8ede8`, borderRadius: "16px",
              overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              transition: "all 0.2s", position: "relative", cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 10px 28px rgba(27,77,46,0.13)`; e.currentTarget.style.borderColor = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = "#e8ede8"; }}
            >
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
              ) : (
                <div style={{ height: "140px", background: `linear-gradient(135deg, #e8f0e8, #d4e4d4)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "52px" }}>
                  {catInfo.icon}
                </div>
              )}
              <div style={{ height: "3px", background: `linear-gradient(90deg, ${GREEN}, ${GOLD})` }} />

              {product.show_home === 1 && (
                <div style={{ position: "absolute", top: "10px", right: "10px", background: `linear-gradient(135deg, ${GOLD}, #e8c96a)`, color: GREEN, padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>⭐ مميز</div>
              )}
              <button onClick={(e) => toggleFavorite(e, product)} style={{
                position: "absolute", top: "10px", left: "10px",
                background: "rgba(255,255,255,0.92)", border: "none", cursor: "pointer",
                fontSize: "17px", width: "33px", height: "33px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)", transition: "transform 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >{favorites.some(f => f.id === product.id) ? "❤️" : "🤍"}</button>

              {added === product.id && (
                <div style={{ position: "absolute", bottom: "68px", right: "8px", left: "8px", background: GREEN, color: GOLD, padding: "6px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", textAlign: "center" }}>✓ أضيف للمفضلة</div>
              )}

              <div style={{ padding: "16px" }}>
                <h3 style={{ margin: "0 0 5px", color: GREEN, fontSize: "15px", fontWeight: "700" }}>{product.name}</h3>
                <p style={{ color: "#888", fontSize: "13px", margin: "0 0 12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: GOLD, fontWeight: "800", fontSize: "16px" }}>{product.price}</span>
                  <span style={{ fontSize: "13px", color: GREEN, fontWeight: "600" }}>عرض التفاصيل ←</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}