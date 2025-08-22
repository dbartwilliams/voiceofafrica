import fs from "fs";
import path from "path";

const routesDir = path.join(process.cwd(), "routes");

fs.readdir(routesDir, (err, files) => {
  if (err) return console.error("Error reading routes folder:", err);

  files.forEach(async (file) => {
    if (!file.endsWith(".js")) return;

    const filePath = path.join(routesDir, file);
    try {
      const routeModule = await import(`file://${filePath}`);
      if (!routeModule.default) {
        console.warn(`⚠️  ${file} does not have a default export!`);
      } else {
        console.log(`✅  ${file} exports a router correctly`);
      }

      // Optional: list named exports
      const namedExports = Object.keys(routeModule).filter(
        (key) => key !== "default"
      );
      if (namedExports.length) {
        console.log(`   Named exports in ${file}:`, namedExports);
      }
    } catch (e) {
      console.error(`❌  Failed to import ${file}:`, e.message);
    }
  });
});
