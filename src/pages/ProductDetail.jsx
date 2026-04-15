import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = {
  kitchens:   { label: "مطابخ",           icon: "🍳" },
  bedrooms:   { label: "غرف نوم",          icon: "🛏️" },
  living:     { label: "غرف معيشة",        icon: "🛋️" },
  offices:    { label: "مكاتب",            icon: "🪑" },
  bathrooms:  { label: "حمامات",           icon: "🚿" },
  outdoor:    { label: "خارجي",            icon: "🌿" },
  "tv-decor": { label: "ديكورات شاشة",    icon: "📺" },
  "plans-2d": { label: "مخططات 2D",       icon: "📐" },
  facades:    { label: "واجهات خارجية",   icon: "🏛️" },
  cladding:   { label: "مواد الإكساء",    icon: "🪵" },
};

const GREEN = "#1B4D2E";
const GOLD  = "#C9A84C";
const GOLD2 = "#e8c96a";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites") || "[]"));
  const [favMsg, setFavMsg] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/products/${id}`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => { setError("المنتج غير موجود"); setLoading(false); });
  }, [id]);

  const isFav = product ? favorites.some(f => f.id === product.id) : false;

  const toggleFavorite = () => {
    if (!auth) { navigate("/login"); return; }
    let updated;
    if (isFav) {
      updated = favorites.filter(f => f.id !== product.id);
      setFavMsg("تمت الإزالة من المفضلة");
    } else {
      updated = [...favorites, product];
      setFavMsg("✅ أضيف إلى المفضلة!");
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setTimeout(() => setFavMsg(""), 2000);
  };

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <img src="/logo.png" alt="" style={{ height: "70px", opacity: 0.4, marginBottom: "16px" }} onError={e => e.target.style.display = "none"} />
        <p style={{ color: "#888", fontSize: "15px" }}>جاري تحميل المنتج...</p>
      </div>
    </div>
  );

  if (error || !product) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "48px" }}>🔍</p>
        <h2 style={{ color: "#555" }}>المنتج غير موجود</h2>
        <button onClick={() => navigate(-1)} style={{ marginTop: "16px", padding: "10px 24px", background: GREEN, border: "none", borderRadius: "10px", cursor: "pointer", color: GOLD, fontWeight: "700" }}>رجوع</button>
      </div>
    </div>
  );

  const catInfo = CATEGORIES[product.category] || { label: product.category, icon: "📦" };

  return (
    <div style={{ direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif", background: "#f5f7f5", minHeight: "100vh" }}>

      {/* Top bar */}
      <div style={{ background: `linear-gradient(90deg, ${GREEN}, #245f38)`, padding: "12px 28px", display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/logo.png" alt="" style={{ height: "32px" }} onError={e => e.target.style.display = "none"} />
        <span style={{ color: GOLD, fontSize: "14px", fontWeight: "700" }}>ARAB DECORATION</span>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "28px 24px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", fontSize: "14px", color: "#888", flexWrap: "wrap" }}>
          <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: GREEN, fontWeight: "600" }}>الرئيسية</span>
          <span style={{ color: GOLD }}>←</span>
          <span onClick={() => navigate(`/products/${product.category}`)} style={{ cursor: "pointer", color: GREEN, fontWeight: "600" }}>{catInfo.icon} {catInfo.label}</span>
          <span style={{ color: GOLD }}>←</span>
          <span style={{ color: "#555" }}>{product.name}</span>
        </div>

        {/* Card */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.09)", border: `1px solid #e8ede8` }}>

          {/* Image */}
          <div style={{ position: "relative", minHeight: "400px", background: `linear-gradient(135deg, #e8f0e8, #d4e4d4)` }}>
            {product.image_url ? (
              <>
                {!imgLoaded && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "60px" }}>{catInfo.icon}</div>}
                <img src={product.image_url} alt={product.name} onLoad={() => setImgLoaded(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.4s", position: "absolute", inset: 0 }} />
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "80px" }}>{catInfo.icon}</div>
            )}
            <div style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(27,77,46,0.85)", backdropFilter: "blur(8px)", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "700", color: GOLD }}>
              {catInfo.icon} {catInfo.label}
            </div>
            {product.show_home === 1 && (
              <div style={{ position: "absolute", top: "14px", left: "14px", background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", color: GREEN }}>
                ⭐ مميز
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column" }}>
            <img src="/logo.png" alt="" style={{ height: "38px", objectFit: "contain", marginBottom: "16px", alignSelf: "flex-start" }} onError={e => e.target.style.display = "none"} />

            <h1 style={{ margin: "0 0 10px", fontSize: "26px", color: GREEN, lineHeight: "1.3", fontWeight: "800" }}>{product.name}</h1>

            <div style={{ fontSize: "30px", fontWeight: "900", color: GOLD, margin: "0 0 16px" }}>{product.price}</div>

            <div style={{ width: "40px", height: "3px", background: `linear-gradient(90deg, ${GREEN}, ${GOLD})`, borderRadius: "2px", margin: "0 0 20px" }} />

            <p style={{ color: "#555", fontSize: "15px", lineHeight: "1.8", margin: "0 0 24px", flex: 1 }}>{product.description}</p>

            <div style={{ background: "#f5f7f5", borderRadius: "12px", padding: "14px", marginBottom: "20px", border: `1px solid #e8ede8` }}>
              {[
                { label: "القسم", value: `${catInfo.icon} ${catInfo.label}` },
                { label: "رقم المنتج", value: `#${product.id}` },
                { label: "تاريخ الإضافة", value: product.date?.split(" ")[0] || "—" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                  <span style={{ color: "#888" }}>{row.label}</span>
                  <span style={{ color: GREEN, fontWeight: "700" }}>{row.value}</span>
                </div>
              ))}
            </div>

            {favMsg && (
              <div style={{ padding: "9px 14px", borderRadius: "10px", marginBottom: "12px", background: isFav ? "#fff5f5" : "#f0fff4", color: isFav ? "#c53030" : "#276749", border: `1px solid ${isFav ? "#fca5a5" : "#9ae6b4"}`, fontSize: "13px", textAlign: "center" }}>{favMsg}</div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={toggleFavorite} style={{
                flex: 1, padding: "13px",
                background: isFav ? "#fff0f0" : "#fff",
                border: `2px solid ${isFav ? "#e74c3c" : "#e2e8f0"}`,
                borderRadius: "12px", cursor: "pointer",
                fontSize: "14px", fontWeight: "700",
                color: isFav ? "#e74c3c" : "#555", transition: "all 0.2s",
              }}>{isFav ? "❤️ في المفضلة" : "🤍 أضف للمفضلة"}</button>

              <button onClick={() => navigate("/contact")} style={{
                flex: 1, padding: "13px",
                background: `linear-gradient(135deg, ${GREEN}, #245f38)`,
                border: "none", borderRadius: "12px", cursor: "pointer",
                fontSize: "14px", fontWeight: "800", color: GOLD, transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >📞 تواصل معنا</button>
            </div>
          </div>
        </div>

        <button onClick={() => navigate(`/products/${product.category}`)} style={{
          marginTop: "20px", padding: "11px 28px",
          background: "#fff", border: `2px solid #e8ede8`,
          borderRadius: "10px", cursor: "pointer", color: "#555", fontSize: "14px", fontWeight: "600", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GREEN; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8ede8"; e.currentTarget.style.color = "#555"; }}
        >← العودة لقسم {catInfo.label}</button>
      </div>
    </div>
  );
}