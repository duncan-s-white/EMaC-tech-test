const { readFile } = require("fs/promises");

exports.selectRecipes = async () => {
  const recipes = await readFile(`./data/data.json`, "utf8");
  return JSON.parse(recipes);
};
