import fs from "fs";

export const preloadModels = () => {
  const modelsPath = __dirname + "/../src/data/models";
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (file == "constants" || file.indexOf(".md")) {
      return;
    }
    if (-file.indexOf(".ts")) {
      require(modelsPath + "/" + file);
    }
  });
  console.log("Mongoose Models are loaded to MongoDB");
};
