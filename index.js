const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // 🔥 This enables CORS
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running ✅");
});

app.post("/track", (req, res) => {
    console.log("Received tracking data:", req.body);
    res.send("Data received");
});

app.get("/track", (req, res) => {
    res.send("Tracking Endpoint Working!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
