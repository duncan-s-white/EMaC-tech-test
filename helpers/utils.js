exports.sumIngredients = (recipe) => {
  const { ingredients } = recipe;
  const sumedIngredients = ingredients.reduce((prev, curr) => {
    if (prev[curr.name]) {
      prev[curr.name].grams += curr.grams;
    } else {
      prev[curr.name] = curr;
    }
    return prev;
  }, {});
  recipe.ingredients = Object.values(sumedIngredients);
  return recipe;
};
