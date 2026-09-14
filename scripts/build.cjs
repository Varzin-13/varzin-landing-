const fs = require("node:fs");
const path = require("node:path");
const out = path.resolve("dist");
fs.mkdirSync(out, { recursive: true });
for (const entry of fs.readdirSync(".", { withFileTypes: true })) {
  if (
    entry.isFile() &&
    /\.(html|css|js|json|xml|txt|md|pdf|mp3|png|jpg|svg|cff|py)$/.test(
      entry.name,
    ) &&
    !/^(package|CODEX_|REDESIGN_|MIGRATION_)/.test(entry.name)
  )
    fs.copyFileSync(entry.name, path.join(out, entry.name));
}
for (const file of ["CNAME", ".nojekyll"])
  fs.copyFileSync(file, path.join(out, file));
for (const dir of ["assets", "paper"])
  fs.cpSync(dir, path.join(out, dir), { recursive: true });
console.log(
  "Static production site assembled in dist/; root deployment remains supported.",
);
