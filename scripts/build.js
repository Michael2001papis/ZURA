const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

function copyFile(src, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, dest);
}

// ניקוי והעתקה
if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true });
fs.mkdirSync(dist, { recursive: true });

copyFile(path.join(root, "index.html"), path.join(dist, "index.html"));
copyFile(path.join(root, "css", "variables.css"), path.join(dist, "css", "variables.css"));
copyFile(path.join(root, "css", "styles.css"), path.join(dist, "css", "styles.css"));
copyFile(path.join(root, "js", "main.js"), path.join(dist, "js", "main.js"));

console.log("Build הושלם: dist/");
