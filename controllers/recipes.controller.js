const { selectRecipes, selectRecipe } = require("../models/recipes.model");

exports.getRecipes = async ({ query }, res) => {
  let exclIngredients = [];
  if (query.exclude_ingredients) {
    exclIngredients = query.exclude_ingredients.split(",").map((ingredient) => {
      return ingredient.slice(-1) === "s"
        ? ingredient.slice(0, -1)
        : ingredient;
    });
  }
  const recipes = await selectRecipes(exclIngredients);
  res.status(200).send({ recipes });
};

exports.getRecipe = async ({ params: { id } }, res) => {
  const recipe = await selectRecipe(id);
  res.status(200).send({ recipe });
};
