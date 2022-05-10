const { readFile } = require("fs/promises");
const { sumIngredients } = require("../helpers/utils");

exports.selectRecipes = async (exclIngredients = []) => {
  const fileContents = await readFile(`./data/data.json`, "utf8");
  const recipes = JSON.parse(fileContents);
  return recipes
    .filter((recipe) => {
      return recipe.ingredients.every((ingredient) => {
        return exclIngredients.every((exclIngredient) => {
          return !ingredient.name.includes(exclIngredient);
        });
      });
    })
    .map((recipe) => sumIngredients(recipe));
};

exports.selectRecipe = async (id) => {
  const fileContents = await readFile(`./data/data.json`, "utf8");
  const recipes = JSON.parse(fileContents);
  return sumIngredients(
    recipes.filter((recipe) => {
      return recipe.id === id;
    })[0]
  );
};
