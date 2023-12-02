import fs from "fs";
import path from "path";

export const preloadModels = () => {
  const modelsPath = path.resolve(__dirname, "../src/data/models");

  const loadedModels: { [key: string]: string[] } = {};
  const loadModels = (dirPath: string, relativePath: string = "") => {
    fs.readdirSync(dirPath).forEach((file) => {
      const fullPath = path.join(dirPath, file);
      const isModelFile: boolean =
        fs.lstatSync(fullPath).isFile() && file.endsWith(".model.ts");
      const isDirectory: boolean = fs.lstatSync(fullPath).isDirectory();

      if (isDirectory) {
        loadModels(fullPath, path.join(relativePath, file));
      } else if (isModelFile) {
        const models = require(fullPath);

        Object.keys(models).forEach((modelName) => {
          const key = path.join(relativePath, file.replace(".model.ts", ""));
          loadedModels[key] = loadedModels[key] || [];
          loadedModels[key].push(modelName);
        });
      }
    });
  };

  loadModels(modelsPath);
  console.log("\n============================================");
  console.log("Loaded the following Mongoose models:");
  const perModelDelimiter = "\n - ";
  Object.keys(loadedModels).forEach((key) => {
    console.log(
      `\n${key}${perModelDelimiter}${loadedModels[key]
        .sort()
        .join(perModelDelimiter)}`
    );
  });
  console.log("\n============================================\n");
};
