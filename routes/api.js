const { getRecipes, getRecipe } = require("../controllers/recipes.controller");

const apiRouter = require("express").Router();

apiRouter.get("/", (_, res) => {
  res.json({ message: "ok" });
});

apiRouter.get("/recipes", getRecipes);

apiRouter.get("/recipes/:id", getRecipe);

module.exports = apiRouter;
