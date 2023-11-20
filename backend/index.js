import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Started at ${4000}`);
});
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

module.exports = app;
