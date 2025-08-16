import React, { useState } from "react";
import "./color.css";

function AIAnalysis({ subscriptions }) {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeWithAI = async () => {
    setLoading(true);
    setResult("");

    const example = `
مثال:
الاشتراكات:
- نتفلكس: 50 ريال، ترفيه، آخر استخدام: قبل أسبوع
- شاهد: 40 ريال، ترفيه، آخر استخدام: قبل 3 شهور

تحليل:
أنت مشترك في نتفلكس وشاهد وهما نفس الفئة. لكن واضح أنك تستخدم نتفلكس أكثر. هل تفكر تلغي شاهد؟
وشاهد لها 3 شهور بدون استخدام، فكر بإلغائها لو ما تحتاجها.

`;

const prompt = `
 أبغاك تحلل الاشتراكات التالية بنفس أسلوب المثال، وكأنك صديقي تساعدني أوفر فلوسي.

${example}

هذي اشتراكاتي:
${JSON.stringify(subscriptions, null, 2)}
`;

    try {
      const response = await fetch("https://sub-trackrs.onrender.com/api/ai"
 , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await response.json();
      setResult(data.reply);
    } catch (error) {
      console.error("خطأ:", error);
      setResult("❌ حدث خطأ أثناء تحليل البيانات.");
    }

    setLoading(false);
  };
const now = new Date();
let potentialSavings = 0;

subscriptions.forEach((sub) => {
  const lastUsedDate = new Date(sub.lastUsed);
  const diffTime = Math.abs(now - lastUsedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 30) {
    potentialSavings += Number(sub.price);
  }
});

  return (
    <div className="ai-analysis-container">
      <h3 className="ai-title">تحليل اشتراكاتك 💳</h3>

      <button className="analyze-btn" onClick={analyzeWithAI} disabled={loading}>
        {loading ? "جاري التحليل..." : "حلل الاشتراكات"}
      </button>
{result && (
  <div className="ai-result-container">
    <h4 className="ai-result-title">📋 تحليل ذكاء اصطناعي:</h4>
    
    <div className="ai-result-list">
      {result.split('\n').map((item, index) => {
        const trimmed = item.trim();
        if (!trimmed) return null;

        const isHeader = trimmed.startsWith("**") && trimmed.endsWith("**");
        const isSuggestion = trimmed.includes("فكر") || trimmed.includes("اقترح") || trimmed.includes("أنصح");
        const isInfo = trimmed.includes("استخدم") || trimmed.includes("مشترك");

        return (
          <div
            key={index}
            className={
              isHeader
                ? "ai-section-header"
                : isSuggestion
                ? "ai-suggestion"
                : isInfo
                ? "ai-info"
                : "ai-result-card-item"
            }
          >
            {trimmed.replace(/\*\*/g, "")}
          </div>
        );
      })}
    </div>
  </div>
)}
{!loading && result && (
  <div className="ai-saving-hint">
    💡 <strong>مؤشر التوفير الشهري:</strong> 
    لقد كان بإمكانك توفير 
    <strong> {potentialSavings} ريال</strong> هذا الشهر
    من الاشتراكات غير المستخدمة.
  </div>
)}


    </div>
  );
}

export default AIAnalysis;
