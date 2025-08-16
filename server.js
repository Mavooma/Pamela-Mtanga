// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use((req, res, next) => {
  const token = req.headers["x-api-key"];
  if (token !== "my-secret-token") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
});

app.get("/api/stats", (req, res) => {
  const now = new Date();
  const lastUpdated = now.toLocaleDateString() + " " + now.toLocaleTimeString();

  const getRandom = (base, variance) => Math.floor(base + Math.random() * variance);

  const generateHistory = (base, variance) => {
    const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    return months.map(m => ({
      month: m,
      followers: getRandom(base, variance)
    }));
  };

  res.json({
    profile: {
      name: "Pamela Mtanga",
      bio: "A Vibrant South African Media Personality and Influencer",
      photo: "https://www.thebeauguide.co.za/wp-content/uploads/2023/09/Pamela-Mtanga-1.jpg",
      niche: "fashion, media, and entrepreneurship",
    },
    lastUpdated,
    stats: {
      instagram: {
        followers: getRandom(12000, 600),
        engagementRate: (3.5 + Math.random()).toFixed(1) + "%",
        monthlyGrowth: "+" + getRandom(200, 500),
        history: generateHistory(11000, 800)
      },
      tiktok: {
        followers: getRandom(55000, 2000),
        engagementRate: (6 + Math.random()).toFixed(1) + "%",
        monthlyGrowth: "+" + getRandom(800, 1500),
        history: generateHistory(50000, 2500)
      },
      youtube: {
        subscribers: getRandom(9500, 600),
        engagementRate: (2.8 + Math.random()).toFixed(1) + "%",
        monthlyGrowth: "+" + getRandom(150, 300),
        history: generateHistory(9000, 500)
      }
    }
  });
});

app.listen(5000, () => console.log("✅ Mock API running at http://localhost:5000"));
