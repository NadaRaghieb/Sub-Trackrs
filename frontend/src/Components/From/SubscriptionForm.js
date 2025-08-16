import React, { useState } from "react";
import "./form.css";

const defaultApps = {
  //  الترفيه
  "Netflix": { category: "ترفيه" },
  "Shahid VIP": { category: "ترفيه" },
  "OSN+": { category: "ترفيه" },
  "StarzPlay": { category: "ترفيه" },
  "TOD": { category: "ترفيه" },
  "YouTube Premium": { category: "ترفيه" },

  //  الموسيقى
  "Spotify": { category: "موسيقى" },
  "Apple Music": { category: "موسيقى" },
  "Anghami": { category: "موسيقى" },

  //  التخزين
  "iCloud": { category: "تخزين" },
  "Google One": { category: "تخزين" },
  "Dropbox": { category: "تخزين" },

  //  التعليم
  "Coursera": { category: "تعليم" },
  "Udemy": { category: "تعليم" },
  "Abjad": { category: "تعليم" },
  "Noon Academy": { category: "تعليم" },
  "Skillshare": { category: "تعليم" },

  //  الذكاء الاصطناعي
  "ChatGPT Plus": { category: "ذكاء" },
  "Grammarly Premium": { category: "ذكاء" },
  "Notion AI": { category: "ذكاء" },

  //  الصحة والرياضة
  "FitOn Pro": { category: "صحة" },
  "Jeeny Gym": { category: "صحة" },
  "Fitness Time": { category: "صحة" },

  //  الشحن والتوصيل
  "Amazon Prime": { category: "توصيل" },
  "HungerStation Gold": { category: "توصيل" },
  "Jahez Plus": { category: "توصيل" },

  //  التصميم والإبداع
  "Canva Pro": { category: "تصميم" },
  "Adobe Creative Cloud": { category: "تصميم" },
  "Figma Pro": { category: "تصميم" },

  //  الخدمات البنكية
  "STC Pay Premium": { category: "بنك" },
  "Al Rajhi E-Services": { category: "بنك" },

  //  الاتصالات
  "STC Packages": { category: "اتصالات" },
  "Mobily Packages": { category: "اتصالات" },
  "Roaming Plans": { category: "اتصالات" },
};


function SubscriptionForm({ subscriptions, setSubscriptions }) {
  const [form, setForm] = useState({
    appName: "",
    customAppName: "", // لو المستخدم اختار "أخرى" يدخل الاسم هنا
    price: "",
    category: "",
    subscriptionType: "شهري", // نوع الاشتراك
    lastUsed: "",
  });

  // لما يتغير اختيار التطبيق
  const handleAppChange = (e) => {
    const selectedApp = e.target.value;
    if (selectedApp === "أخرى") {
      // لو اختر "أخرى" نفتح حقل لإدخال اسم جديد ونعطي فئة فارغة
      setForm({
        ...form,
        appName: selectedApp,
        customAppName: "",
        category: "",
      });
    } else {
      // لو اختر تطبيق موجود، نملأ الفئة تلقائياً ونخلي اسم جديد فارغ
      setForm({
        ...form,
        appName: selectedApp,
        customAppName: "",
        category: defaultApps[selectedApp]?.category || "",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    // نحدد اسم التطبيق النهائي
    const finalName = form.appName === "أخرى" ? form.customAppName.trim() : form.appName;

    if (finalName && form.price && form.category && form.lastUsed) {
      const newSubscription = {
        name: finalName,
        price: form.price,
        category: form.category,
        subscriptionType: form.subscriptionType,
        lastUsed: form.lastUsed,
      };

      setSubscriptions([...subscriptions, newSubscription]);
      setForm({
        appName: "",
        customAppName: "",
        price: "",
        category: "",
        subscriptionType: "شهري",
        lastUsed: "",
      });
    } else {
      alert("يرجى تعبئة جميع الحقول");
    }
  };

  return (
    <div className="form-container">
  <h2 className="form-title">أضف اشتراك جديد</h2>

  {/* التطبيق */}
  <select name="appName" value={form.appName} onChange={handleAppChange} className="form-input">
    <option value="">اختر التطبيق</option>
    {Object.keys(defaultApps).map((app) => (
      <option key={app} value={app}>{app}</option>
    ))}
    <option value="أخرى">أخرى</option>
  </select>

  {/* إدخال اسم التطبيق يدوي */}
  {form.appName === "أخرى" && (
    <input
      type="text"
      name="customAppName"
      placeholder="اكتب اسم التطبيق"
      value={form.customAppName}
      onChange={handleChange}
      className="form-input"
    />
  )}

  {/* الصف الأول: السعر + نوع الاشتراك */}
  <div className="form-row">
    <input
      type="number"
      name="price"
      placeholder="السعر"
      value={form.price}
      onChange={handleChange}
      className="form-input"
    />

    <select
      name="subscriptionType"
      value={form.subscriptionType}
      onChange={handleChange}
      className="form-input"
    >
      <option value="شهري">شهري</option>
      <option value="سنوي">سنوي</option>
    </select>
  </div>

  {/* الصف الثاني: الفئة + آخر استخدام */}
  <div className="form-row">
    <select
      name="category"
      value={form.category}
      onChange={handleChange}
      className="form-input"
    >
      <option value="">اختر الفئة</option>
      <option value="ترفيه">ترفيه</option>
      <option value="تعليم">تعليم</option>
      <option value="صحة">صحة</option>
      <option value="موسيقى">موسيقى</option>
      <option value="تخزين">التخزين</option>
      <option value="ذكاء">الذكاء الاصطناعي</option>
      <option value="توصيل">الشحن والتوصيل</option>
      <option value="تصميم">التصميم والإبداع</option>
      <option value="اتصالات">الاتصالات</option>
      <option value="أخرى">أخرى</option>
    </select>

    <input
      type="date"
      name="lastUsed"
      value={form.lastUsed}
      onChange={handleChange}
      className="form-input"
    />
  </div>

  <button onClick={handleAdd} className="form-button">أضف الاشتراك</button>
</div>

  );
}

export default SubscriptionForm;
