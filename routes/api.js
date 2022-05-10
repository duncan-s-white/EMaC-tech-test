const apiRouter = require("express").Router();
const { selectRecipes } = require("../models/recipes.model");

apiRouter.get("/", (_, res) => {
  res.json({ message: "ok" });
});

apiRouter.get("/recipes", async (_, res) => {
  const recipes = await selectRecipes();
  res.status(200).send({ recipes });
});

module.exports = apiRouter;
