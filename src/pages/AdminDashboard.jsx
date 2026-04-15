  import React, { useState, useEffect, useRef } from "react";
  import { useAuth } from "../context/AuthContext";

  const CATEGORIES = [
    { id: "kitchens", label: "مطابخ", icon: "🍳" },
    { id: "bedrooms", label: "غرف نوم", icon: "🛏️" },
    { id: "living", label: "غرف معيشة", icon: "🛋️" },
    { id: "offices", label: "مكاتب", icon: "🪑" },
    { id: "bathrooms", label: "حمامات", icon: "🚿" },
    { id: "outdoor", label: "خارجي", icon: "🌿" },
    { id: "facades", label: "واجهات خارجية", icon: "🏛️" },
    { id: "cladding", label: "مواد الإكساء", icon: "🪵" },
    { id: "tv-decor", label: "ديكورات شاشة", icon: "📺" },
    { id: "plans-2d", label: "مخططات 2D", icon: "📐" },
    

  ];

  const inputStyle = {
    padding: "11px 14px", borderRadius: "10px",
    border: "1px solid #e2e8f0", fontSize: "14px",
    outline: "none", width: "100%", boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  };

  const btnStyle = (color = "#1a2a3a") => ({
    padding: "10px 20px", background: color, color: color === "#1a2a3a" ? "#c9a96e" : "#fff",
    border: "none", borderRadius: "10px", cursor: "pointer",
    fontSize: "14px", fontWeight: "600",
  });

  export default function AdminDashboard() {
    const { auth } = useAuth();
    const [tab, setTab] = useState("products");

    // Products state
    const [product, setProduct] = useState({ name: "", price: "", description: "", category: "kitchens", show_home: false });
    const [imagePreview, setImagePreview] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [products, setProducts] = useState([]);
    const [filterCat, setFilterCat] = useState("all");
    const [productMsg, setProductMsg] = useState({ text: "", type: "" });
    const fileRef = useRef();

    // Updates state
    const [update, setUpdate] = useState({ title: "", content: "" });
    const [updates, setUpdates] = useState([]);
    const [updateMsg, setUpdateMsg] = useState({ text: "", type: "" });

    useEffect(() => { fetchProducts(); fetchUpdates(); }, []);

    const headers = () => ({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${auth.token}`
    });

    // ========== PRODUCTS ==========
    const fetchProducts = async () => {
      const res = await fetch("https://arab-decoration-backend.onrender.com/products");
      const data = await res.json();
      setProducts(data);
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target.result);
        setImageBase64(ev.target.result);
      };
      reader.readAsDataURL(file);
    };

    const handleAddProduct = async () => {
      setProductMsg({ text: "", type: "" });
      if (!product.name || !product.price || !product.description) {
        setProductMsg({ text: "يرجى تعبئة جميع الحقول", type: "error" }); return;
      }
      try {
        const res = await fetch("https://arab-decoration-backend.onrender.com/add_product", {
          method: "POST",
          headers: headers(),
          body: JSON.stringify({ ...product, image: imageBase64 }),
        });
        const data = await res.json();
        if (res.ok) {
          setProductMsg({ text: "✅ تمت إضافة المنتج!", type: "success" });
          setProduct({ name: "", price: "", description: "", category: "kitchens", show_home: false });
          setImagePreview(null); setImageBase64(null);
          if (fileRef.current) fileRef.current.value = "";
          fetchProducts();
        } else {
          setProductMsg({ text: data.error || "فشلت الإضافة", type: "error" });
        }
      } catch {
        setProductMsg({ text: "خطأ في الاتصال", type: "error" });
      }
    };

    const handleDeleteProduct = async (id) => {
      if (!window.confirm("هل تريد حذف هذا المنتج؟")) return;
      await fetch(`https://arab-decoration-backend.onrender.com/delete_product/${id}`, { method: "DELETE", headers: headers() });
      fetchProducts();
    };

    // ========== UPDATES ==========
    const fetchUpdates = async () => {
      const res = await fetch("https://arab-decoration-backend.onrender.com/updates");
      const data = await res.json();
      setUpdates(data);
    };

    const handleAddUpdate = async () => {
      if (!update.title || !update.content) {
        setUpdateMsg({ text: "يرجى تعبئة جميع الحقول", type: "error" }); return;
      }
      const res = await fetch("https://arab-decoration-backend.onrender.com/add_update", {
        method: "POST", headers: headers(),
        body: JSON.stringify(update),
      });
      const data = await res.json();
      if (res.ok) {
        setUpdateMsg({ text: "✅ تمت إضافة التحديث!", type: "success" });
        setUpdate({ title: "", content: "" });
        fetchUpdates();
      } else {
        setUpdateMsg({ text: data.error, type: "error" });
      }
    };

    const handleDeleteUpdate = async (id) => {
      if (!window.confirm("حذف هذا التحديث؟")) return;
      await fetch(`https://arab-decoration-backend.onrender.com/delete_update/${id}`, { method: "DELETE", headers: headers() });
      fetchUpdates();
    };

    const filteredProducts = filterCat === "all" ? products : products.filter(p => p.category === filterCat);

    const msgBox = (msg) => msg.text ? (
      <div style={{
        padding: "10px 14px", borderRadius: "8px", marginBottom: "12px", fontSize: "13px",
        background: msg.type === "success" ? "#f0fff4" : "#fff5f5",
        color: msg.type === "success" ? "#276749" : "#c53030",
        border: `1px solid ${msg.type === "success" ? "#9ae6b4" : "#fc8181"}`,
      }}>{msg.text}</div>
    ) : null;

    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px", direction: "rtl", fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
        <h2 style={{ color: "#1a2a3a", marginBottom: "24px" }}>⚙️ لوحة الإدارة</h2>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
          {[
            { key: "products", label: "🛍️ المنتجات" },
            { key: "updates", label: "📢 التحديثات" },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: "10px 24px", border: "none", borderRadius: "10px", cursor: "pointer",
              fontWeight: "600", fontSize: "14px",
              background: tab === t.key ? "#1a2a3a" : "#f0f0f0",
              color: tab === t.key ? "#c9a96e" : "#555",
            }}>{t.label}</button>
          ))}
        </div>

        {/* ========== PRODUCTS TAB ========== */}
        {tab === "products" && (
          <div>
            {/* Add Product Form */}
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "24px", marginBottom: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin: "0 0 20px", color: "#1a2a3a" }}>➕ إضافة منتج جديد</h3>
              {msgBox(productMsg)}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <input style={inputStyle} placeholder="اسم المنتج *" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
                <input style={inputStyle} placeholder="السعر (مثال: 5,000 ر.س) *" value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} />
              </div>

              <textarea
                style={{ ...inputStyle, resize: "vertical", marginBottom: "12px" }}
                placeholder="وصف المنتج *"
                rows={3}
                value={product.description}
                onChange={e => setProduct({ ...product, description: e.target.value })}
              />

              {/* Category Selector */}
              <div style={{ marginBottom: "12px" }}>
                <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#666", fontWeight: "600" }}>القسم *</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => setProduct({ ...product, category: cat.id })} style={{
                      padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px",
                      border: "2px solid",
                      borderColor: product.category === cat.id ? "#1a2a3a" : "#e2e8f0",
                      background: product.category === cat.id ? "#1a2a3a" : "#fff",
                      color: product.category === cat.id ? "#c9a96e" : "#555",
                      fontWeight: product.category === cat.id ? "700" : "400",
                      transition: "all 0.15s",
                    }}>
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show on Home Toggle */}
              <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  id="show_home"
                  checked={product.show_home}
                  onChange={e => setProduct({ ...product, show_home: e.target.checked })}
                  style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "#1a2a3a" }}
                />
                <label htmlFor="show_home" style={{ cursor: "pointer", fontSize: "14px", color: "#444", fontWeight: "500" }}>
                  🏠 عرض هذا المنتج في الصفحة الرئيسية
                </label>
              </div>

              {/* Image Upload */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#666", fontWeight: "600" }}>صورة المنتج</p>
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "20px",
                    textAlign: "center", cursor: "pointer", background: "#fafafa",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#c9a96e"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                >
                  {imagePreview ? (
                    <div>
                      <img src={imagePreview} alt="preview" style={{ maxHeight: "160px", maxWidth: "100%", borderRadius: "8px", objectFit: "cover" }} />
                      <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#888" }}>انقر لتغيير الصورة</p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: "32px", margin: "0 0 8px" }}>📷</p>
                      <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>انقر لرفع صورة المنتج</p>
                      <p style={{ color: "#bbb", fontSize: "11px", margin: "4px 0 0" }}>JPG, PNG, WEBP</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
              </div>

              <button onClick={handleAddProduct} style={{ ...btnStyle(), width: "100%", padding: "13px" }}>
                ➕ إضافة المنتج
              </button>
            </div>

            {/* Products List */}
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
                <h3 style={{ margin: 0, color: "#1a2a3a" }}>كل المنتجات ({products.length})</h3>
                <select
                  value={filterCat}
                  onChange={e => setFilterCat(e.target.value)}
                  style={{ ...inputStyle, width: "auto", padding: "8px 12px" }}
                >
                  <option value="all">كل الأقسام</option>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                </select>
              </div>

              {filteredProducts.length === 0 ? (
                <p style={{ color: "#aaa", textAlign: "center", padding: "20px" }}>لا توجد منتجات بعد</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {filteredProducts.map(p => (
                    <div key={p.id} style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "14px", borderRadius: "12px",
                      border: "1px solid #f0f0f0", background: "#fafafa",
                    }}>
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: "60px", height: "60px", background: "#e2e8f0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
                          {CATEGORIES.find(c => c.id === p.category)?.icon || "📦"}
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <p style={{ margin: 0, fontWeight: "700", color: "#1a2a3a", fontSize: "14px" }}>{p.name}</p>
                          <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "10px", background: "#e8f4fd", color: "#2980b9" }}>
                            {CATEGORIES.find(c => c.id === p.category)?.label}
                          </span>
                          {p.show_home === 1 && (
                            <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "10px", background: "#e8fff0", color: "#27ae60" }}>🏠 رئيسية</span>
                          )}
                        </div>
                        <p style={{ margin: "3px 0 0", color: "#c9a96e", fontWeight: "600", fontSize: "13px" }}>{p.price}</p>
                        <p style={{ margin: "2px 0 0", color: "#888", fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.description}</p>
                      </div>
                      <button onClick={() => handleDeleteProduct(p.id)} style={{
                        background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.2)",
                        color: "#e74c3c", padding: "7px 14px", borderRadius: "8px",
                        cursor: "pointer", fontSize: "13px", flexShrink: 0,
                      }}>🗑 حذف</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== UPDATES TAB ========== */}
        {tab === "updates" && (
          <div>
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "24px", marginBottom: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin: "0 0 16px", color: "#1a2a3a" }}>➕ إضافة تحديث</h3>
              {msgBox(updateMsg)}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input style={inputStyle} placeholder="العنوان" value={update.title} onChange={e => setUpdate({ ...update, title: e.target.value })} />
                <textarea style={{ ...inputStyle, resize: "vertical" }} rows={4} placeholder="المحتوى" value={update.content} onChange={e => setUpdate({ ...update, content: e.target.value })} />
                <button onClick={handleAddUpdate} style={{ ...btnStyle(), alignSelf: "flex-start", padding: "11px 28px" }}>نشر التحديث</button>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin: "0 0 16px", color: "#1a2a3a" }}>التحديثات ({updates.length})</h3>
              {updates.length === 0 ? <p style={{ color: "#aaa" }}>لا توجد تحديثات</p> : updates.map(u => (
                <div key={u.id} style={{ padding: "14px", borderRadius: "12px", border: "1px solid #f0f0f0", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div>
                    <p style={{ margin: "0 0 4px", fontWeight: "700", color: "#1a2a3a" }}>{u.title}</p>
                    <p style={{ margin: "0 0 4px", color: "#666", fontSize: "13px" }}>{u.content}</p>
                    <small style={{ color: "#aaa" }}>{u.date}</small>
                  </div>
                  <button onClick={() => handleDeleteUpdate(u.id)} style={{ background: "rgba(231,76,60,0.1)", border: "1px solid rgba(231,76,60,0.2)", color: "#e74c3c", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", flexShrink: 0 }}>🗑 حذف</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }