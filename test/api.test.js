const supertest = require("supertest");
const server = require("../server");

const request = supertest(server);

describe("GET - /api", () => {
  test("Status 200: server status", async () => {
    const { body } = await request.get("/api").expect(200);
    expect(body.message).toBe("ok");
  });
});

describe("GET - /api/recipes", () => {
  test("Status 200: returns a list of all recipes with expected properties", async () => {
    const { body } = await request.get("/api/recipes").expect(200);
    body.recipes.forEach((recipe) => {
      expect(recipe).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          imageUrl: expect.any(String),
          instructions: expect.any(String),
          ingredients: expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              grams: expect.any(Number),
            }),
          ]),
        })
      );
    });
  });
  test("Status 200: returns filtered list of recipes based on excluded ingredients", async () => {
    const { body } = await request
      .get("/api/recipes?exclude_ingredients=apples,bananas,carrots")
      .expect(200);
    body.recipes.forEach((recipe) => {
      expect(recipe).not.toEqual(
        expect.objectContaining({
          ingredients: expect.arrayContaining([
            expect.objectContaining({
              name: expect.stringMatching(/apple|banana|carrot/),
            }),
          ]),
        })
      );
    });
  });
});
