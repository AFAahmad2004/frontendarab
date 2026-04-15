import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const categories = [
  { id: "kitchens",       label: "مطابخ",             icon: "🍳", img: "/cat-kitchens.jpg" },
  { id: "bedrooms",       label: "غرف نوم",            icon: "🛏️", img: "/cat-bedrooms.jpg" },
  { id: "living",         label: "غرف معيشة",          icon: "🛋️", img: "/cat-living.jpg" },
  { id: "offices",        label: "مكاتب",              icon: "🪑", img: "/cat-offices.jpg" },
  { id: "bathrooms",      label: "حمامات",             icon: "🚿", img: "/cat-bathrooms.jpg" },
  { id: "outdoor",        label: "خارجي",              icon: "🌿", img: "/cat-outdoor.jpg" },
  { id: "tv-decor",       label: "ديكورات شاشة",       icon: "📺", img: "/cat-tv-decor.jpg" },
  { id: "plans-2d",       label: "مخططات 2D",          icon: "📐",img:"/cat-plans-2d.jpg" },
  { id: "facades",        label: "واجهات خارجية",      icon: "🏛️",img:"/cat-facades.jpg" },
  { id: "cladding",       label: "مواد الإكساء",       icon: "🪵",img:"/cat-cladding.jpg" },
];

const GREEN  = "#1B4D2E";
const GOLD   = "#C9A84C";
const GOLD2  = "#e8c96a";
const DARK   = "#163d24";

export default function Sidebar({ isOpen, onClose, isMobile }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("products");

  const handleNav = (path) => { navigate(path); onClose(); };
  const handleLogout = () => { logout(); navigate("/login"); onClose(); };

  // روابط الناف بار التي تظهر على الجوال فقط في السايدبار
  const navLinks = [
    { to: "/", label: "الرئيسية", icon: "🏠" },
    ...(auth?.role === "admin" ? [{ to: "/admin", label: "الإدارة", icon: "⚙️" }] : []),
    ...(auth?.role === "client" ? [{ to: "/client", label: "لوحتي", icon: "📋" }] : []),
    { to: "/contact", label: "تواصل معنا", icon: "✉️" },
  ];

  const tabBtn = (key, label) => (
    <button key={key} onClick={() => setActiveSection(key)} style={{
      flex: 1, padding: "8px 4px", border: "none", borderRadius: "8px",
      cursor: "pointer", fontSize: "11px", fontWeight: "600", transition: "all 0.2s",
      background: activeSection === key ? GOLD : "transparent",
      color: activeSection === key ? GREEN : "rgba(255,255,255,0.5)",
    }}>{label}</button>
  );

  return (
    <>
      {isOpen && (
        <div onClick={onClose} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
          zIndex: 998, backdropFilter: "blur(3px)",
        }} />
      )}

      <div style={{
        position: "fixed", top: 0, right: 0,
        height: "100vh", width: "300px",
        background: `linear-gradient(160deg, ${GREEN} 0%, ${DARK} 100%)`,
        zIndex: 999,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.4)",
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        direction: "rtl", overflowY: "auto",
      }}>

        {/* Header — بدون "ديكور عربي" */}
        <div style={{
          padding: "20px", borderBottom: `1px solid rgba(201,168,76,0.2)`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src="/logo.png" alt="logo" style={{ height: "44px", objectFit: "contain" }}
              onError={e => e.target.style.display = "none"} />
            <div style={{ color: GOLD, fontWeight: "800", fontSize: "14px" }}>ARAB DECORATION</div>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.08)", border: "none", color: "#fff",
            width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontSize: "14px",
          }}>✕</button>
        </div>

        {/* روابط التنقل — تظهر على الجوال فقط */}
        {isMobile && (
          <div style={{ padding: "10px 14px", borderBottom: `1px solid rgba(201,168,76,0.15)` }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", margin: "0 0 8px", letterSpacing: "1px" }}>التنقل</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {navLinks.map(link => (
                <button key={link.to} onClick={() => handleNav(link.to)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "11px 14px",
                  background: "rgba(201,168,76,0.08)",
                  border: `1px solid rgba(201,168,76,0.2)`,
                  borderRadius: "10px", cursor: "pointer",
                  color: GOLD, fontSize: "14px", fontWeight: "700", textAlign: "right",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(201,168,76,0.08)"}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              ))}
              {/* زر دخول/خروج على الجوال */}
              {auth ? (
                <button onClick={handleLogout} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "11px 14px", marginTop: "4px",
                  background: "rgba(255,80,60,0.08)", border: "1px solid rgba(255,80,60,0.25)",
                  borderRadius: "10px", cursor: "pointer", color: "#ff6b5b",
                  fontSize: "14px", fontWeight: "600", textAlign: "right",
                }}>
                  <span>🚪</span><span>تسجيل الخروج</span>
                </button>
              ) : (
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <button onClick={() => handleNav("/login")} style={{ flex: 1, padding: "11px", background: GOLD, border: "none", borderRadius: "10px", cursor: "pointer", color: GREEN, fontWeight: "800", fontSize: "14px" }}>دخول</button>
                  <button onClick={() => handleNav("/register")} style={{ flex: 1, padding: "11px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", cursor: "pointer", color: "#fff", fontSize: "14px" }}>تسجيل</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{
          display: "flex", margin: "14px", background: "rgba(0,0,0,0.2)",
          borderRadius: "10px", padding: "4px", gap: "3px",
        }}>
          {tabBtn("products", "المنتجات")}
          {tabBtn("account",  "حسابي")}
          {tabBtn("favorites","المفضلة")}
          {tabBtn("contact",  "تواصل")}
        </div>

        {/* ===== PRODUCTS ===== */}
        {activeSection === "products" && (
          <div style={{ padding: "4px 14px", flex: 1 }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginBottom: "10px", letterSpacing: "1px" }}>تصفح الأقسام</p>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => handleNav(`/products/${cat.id}`)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: "12px",
                padding: "8px 10px", marginBottom: "6px",
                background: "rgba(255,255,255,0.05)",
                border: `1px solid rgba(201,168,76,0.1)`,
                borderRadius: "12px", cursor: "pointer", color: "#e8f0e8",
                fontSize: "14px", textAlign: "right", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `rgba(201,168,76,0.15)`; e.currentTarget.style.borderColor = `rgba(201,168,76,0.4)`; e.currentTarget.style.transform = "translateX(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)"; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                {/* صورة مصغرة أو إيموجي */}
                {cat.img ? (
                  <div style={{ width: "38px", height: "38px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid rgba(201,168,76,0.3)" }}>
                    <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <span style={{ fontSize: "22px", flexShrink: 0 }}>{cat.icon}</span>
                )}
                <span style={{ fontWeight: "500" }}>{cat.label}</span>
                <span style={{ marginRight: "auto", color: GOLD, fontSize: "12px" }}>←</span>
              </button>
            ))}
          </div>
        )}

        {/* ===== ACCOUNT ===== */}
        {activeSection === "account" && (
          <div style={{ padding: "8px 14px", flex: 1 }}>
            {auth ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0 16px", borderBottom: `1px solid rgba(201,168,76,0.15)`, marginBottom: "14px" }}>
                  <div style={{
                    width: "68px", height: "68px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "26px", fontWeight: "800", color: GREEN,
                    marginBottom: "10px", boxShadow: `0 4px 16px rgba(201,168,76,0.35)`,
                  }}>{auth.name?.charAt(0).toUpperCase()}</div>
                  <p style={{ color: "#fff", fontWeight: "700", fontSize: "15px", margin: "0 0 6px" }}>{auth.name}</p>
                  <span style={{
                    background: auth.role === "admin" ? "rgba(255,80,60,0.2)" : `rgba(201,168,76,0.15)`,
                    color: auth.role === "admin" ? "#ff6b5b" : GOLD,
                    padding: "3px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                  }}>{auth.role === "admin" ? "⚙️ مدير" : "👤 عميل"}</span>
                </div>
                {[
                  { icon: "🏠", label: "الرئيسية", path: "/" },
                  auth.role === "admin"
                    ? { icon: "⚙️", label: "لوحة الإدارة", path: "/admin" }
                    : { icon: "📋", label: "لوحتي", path: "/client" },
                ].map(item => (
                  <button key={item.path} onClick={() => handleNav(item.path)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "12px",
                    padding: "12px 14px", marginBottom: "6px",
                    background: "rgba(255,255,255,0.05)", border: `1px solid rgba(201,168,76,0.1)`,
                    borderRadius: "12px", cursor: "pointer", color: "#e8f0e8", fontSize: "14px", textAlign: "right",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = `rgba(201,168,76,0.15)`}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  >
                    <span>{item.icon}</span><span>{item.label}</span>
                  </button>
                ))}
                <button onClick={handleLogout} style={{
                  width: "100%", marginTop: "12px", padding: "12px",
                  border: "1px solid rgba(255,80,60,0.3)", borderRadius: "12px", cursor: "pointer",
                  background: "rgba(255,80,60,0.08)", color: "#ff6b5b",
                  fontSize: "14px", fontWeight: "600", transition: "all 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,80,60,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,80,60,0.08)"}
                >🚪 تسجيل الخروج</button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "20px", fontSize: "14px" }}>سجّل دخولك للوصول لحسابك</p>
                <button onClick={() => handleNav("/login")} style={{ width: "100%", padding: "12px", background: GOLD, border: "none", borderRadius: "12px", cursor: "pointer", color: GREEN, fontWeight: "800", fontSize: "15px", marginBottom: "10px" }}>تسجيل الدخول</button>
                <button onClick={() => handleNav("/register")} style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", cursor: "pointer", color: "#fff", fontSize: "14px" }}>إنشاء حساب</button>
              </div>
            )}
          </div>
        )}

        {/* ===== FAVORITES ===== */}
        {activeSection === "favorites" && (
          <div style={{ padding: "8px 14px", flex: 1 }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginBottom: "14px", letterSpacing: "1px" }}>المنتجات المحفوظة</p>
            {!auth ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <p style={{ fontSize: "36px", marginBottom: "10px" }}>🔒</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>سجّل دخولك لعرض المفضلة</p>
                <button onClick={() => handleNav("/login")} style={{ marginTop: "16px", padding: "10px 24px", background: GOLD, border: "none", borderRadius: "10px", cursor: "pointer", color: GREEN, fontWeight: "700" }}>تسجيل الدخول</button>
              </div>
            ) : (
              <FavoritesList onNavigate={handleNav} />
            )}
          </div>
        )}

        {/* ===== CONTACT ===== */}
        {activeSection === "contact" && (
          <div style={{ padding: "8px 14px", flex: 1 }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginBottom: "14px", letterSpacing: "1px" }}>معلومات التواصل</p>
            {[
              { icon: "🏢", label: "المهنس المعماري : حمزة عرب",     value: "897 269 956 963+"},
              {  icon: "🏢", label: "مدير المشاريع : عقبة عرب",     value: "287 462 951 963+" },
              { icon: "📧", label: "البريد",      value: "hamzaarab987@gmail.com"  },
              {  icon: "📍", label: "الموقع",      value: "ادلب / ارمناز" },
            ].map(item => (
              <div key={item.label} style={{ padding: "12px 14px", marginBottom: "8px", background: "rgba(255,255,255,0.04)", border: `1px solid rgba(201,168,76,0.12)`, borderRadius: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  <span style={{ color: GOLD, fontSize: "11px", fontWeight: "700" }}>{item.label}</span>
                </div>
                <p style={{ color: "#d4e8d4", fontSize: "13px", margin: "0 24px" }}>{item.value}</p>
              </div>
            ))}
            <div style={{ marginTop: "14px" }}>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginBottom: "10px", letterSpacing: "1px" }}>تابعنا</p>
              <div style={{ display: "flex", gap: "8px" }}>
                {["📘","📸","🐦","💬"].map((ic, i) => (
                  <button key={i} style={{ flex: 1, padding: "11px 0", background: "rgba(255,255,255,0.05)", border: `1px solid rgba(201,168,76,0.15)`, borderRadius: "10px", cursor: "pointer", fontSize: "18px", transition: "all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = `rgba(201,168,76,0.15)`}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  >{ic}</button>
                ))}
              </div>
            </div>
            <button onClick={() => handleNav("/contact")} style={{ width: "100%", marginTop: "18px", padding: "13px", border: "none", background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, borderRadius: "12px", cursor: "pointer", color: GREEN, fontWeight: "800", fontSize: "14px" }}>
              ✉️ أرسل رسالة
            </button>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "14px", borderTop: `1px solid rgba(201,168,76,0.15)`, textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", margin: 0 }}>© 2025 Arab Decoration — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </>
  );
}

function FavoritesList({ onNavigate }) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const GOLD = "#C9A84C";
  const GREEN = "#1B4D2E";

  if (favorites.length === 0) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <p style={{ fontSize: "36px", marginBottom: "10px" }}>🤍</p>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>لا توجد منتجات في المفضلة بعد</p>
    </div>
  );

  return favorites.map(item => (
    <div key={item.id} onClick={() => onNavigate(`/product/${item.id}`)} style={{
      display: "flex", alignItems: "center", gap: "12px",
      padding: "12px", marginBottom: "8px",
      background: "rgba(255,255,255,0.04)",
      border: `1px solid rgba(201,168,76,0.12)`,
      borderRadius: "12px", cursor: "pointer", transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.background = `rgba(201,168,76,0.12)`; e.currentTarget.style.transform = "translateX(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(0)"; }}
    >
      {item.image_url ? (
        <img src={item.image_url} alt={item.name} style={{ width: "46px", height: "46px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
      ) : (
        <div style={{ width: "46px", height: "46px", background: "rgba(201,168,76,0.15)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>🛋️</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "#e8f0e8", fontSize: "13px", margin: "0 0 3px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
        <p style={{ color: GOLD, fontSize: "12px", margin: 0 }}>{item.price}</p>
      </div>
      <span style={{ color: GOLD, fontSize: "14px" }}>←</span>
    </div>
  ));
}