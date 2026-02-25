const express = require("express");
const admin = require("firebase-admin");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ Firebase Setup
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ Test Route
app.get("/test", async (req, res) => {
  try {
    await db.collection("test").add({
      message: "Firebase Connected 🚀",
      time: new Date()
    });

    res.send("Data saved to Firebase");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ✅ Contact Form Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await db.collection("contacts").add({
      name,
      email,
      message,
      createdAt: new Date()
    });

    res.json({ success: true, message: "Data saved successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Port for Render
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});