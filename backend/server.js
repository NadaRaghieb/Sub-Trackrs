const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.post("/api/ai", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini",  //  "" حسب المفتاح المتوفر 
        messages: [
          { role: "system", content: "أنت مساعد مالي ذكي" },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;
    res.json({ reply: reply || "لم يتم توليد رد." });
  } catch (error) {
    console.error("OpenRouter API error:", error?.response?.data || error.message);
    res.status(500).json({ error: "فشل في جلب رد الذكاء الاصطناعي." });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
