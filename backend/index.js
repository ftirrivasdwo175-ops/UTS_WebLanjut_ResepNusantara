const express = require("express");
const cors = require("cors");

const resepRoutes = require("./routes/resepRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", resepRoutes);

app.get("/", (req, res) => {
  res.send("API Resep UMKM jalan");
});

app.listen(3000, () => {
  console.log("Server running di http://localhost:3000");
});
