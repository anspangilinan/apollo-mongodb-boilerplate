import fs from "fs";

export const preloadModels = () => {
  const modelsPath = __dirname + "/../src/data/models";
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (file == "constants") {
      return;
    }
    if (-file.indexOf(".js")) {
      require(modelsPath + "/" + file);
    }
  });
};
