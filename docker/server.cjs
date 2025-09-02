const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const distDir = path.join(__dirname, "dist");

const runtimeEnv = {
  API_URL: process.env.API_URL || "",
  API_TOKEN: process.env.API_TOKEN || "",
};
fs.writeFileSync(
  path.join(distDir, "env.js"),
  `window.__APP_CONFIG__=${JSON.stringify(runtimeEnv)};`
);

app.use(express.static(distDir, { index: "index.html" }));

app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`UI on :${port} | API_URL=${runtimeEnv.API_URL || "<not set>"}`);
});
