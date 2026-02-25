const express = require("express");
const admin = require("firebase-admin");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// ===============================
// 🔥 Firebase Setup (Render ENV)
// ===============================

if (!process.env.FIREBASE_KEY) {
  console.error("FIREBASE_KEY is missing in environment variables");
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

console.log("✅ Firebase connected");

// ===============================
// ✅ Test Route
// ===============================

app.get("/test", async (req, res) => {
  try {
    await db.collection("test").add({
      message: "Firebase Connected 🚀",
      time: new Date(),
    });

    res.send("Data saved to Firebase successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// ===============================
// ✅ Contact Form Route
// ===============================

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 🔎 Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await db.collection("contacts").add({
      name,
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      message: "Message saved successfully 🚀",
    });

  } catch (error) {
    console.error("Firestore Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ===============================
// ✅ Handle SPA Refresh
// ===============================

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ===============================
// ✅ Start Server (Render)
// ===============================

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});