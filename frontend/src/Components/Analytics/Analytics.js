import React from "react";
import SR from "../../img/image.png";
import "./analytics.css";

function Analytics({ subscriptions }) {
  if (subscriptions.length === 0) return null;

  const total = subscriptions.reduce((sum, sub) => sum + Number(sub.price), 0);

  const categories = {};

  subscriptions.forEach((sub) => {
    const cat = sub.category || "أخرى";
    if (!categories[cat]) {
      categories[cat] = 0;
    }
    categories[cat] += Number(sub.price);
  });

  const percentages = {};
  for (let cat in categories) {
    percentages[cat] = ((categories[cat] / total) * 100).toFixed(1);
  }

  return (
    <div className="analytics-container">
      <h3 className="analytics-title">تحليل الإنفاق الشهري</h3>
      <p className="total-expense">
        📊 مجموع الإنفاق: <strong>{total}</strong>{" "}
        <img width="15px" height="15px" src={SR} alt="ريال" />
      </p>

      <ul className="category-list">
        {Object.entries(percentages).map(([category, value]) => (
          <li key={category}>
            <span>{getIcon(category)} {category}:</span>
            <span>{value}%</span>
          </li>
        ))}
      </ul>

      <div className="chart">
        {Object.entries(percentages).map(([cat, percent]) => (
          <div key={cat} className="bar-group">
            <label>{getIcon(cat)}</label>
            <div className="bar">
              <div
                className="fill"
                style={{ width: `${percent}%` }}
                title={`${percent}%`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getIcon(category) {
  const icons = {
    ترفيه: "🎬",
    تعليم: "📚",
    صحة: "🩺",
    موسيقى: "🎵",
    تخزين: "☁️",
    ذكاء: "🤖",
    توصيل: "🚚",
    تصميم: "🎨",
    اتصالات: "📞",
    بنك: "💳",
    أخرى: "🗂️",
  };
  return icons[category] || "📦";
}

export default Analytics;
