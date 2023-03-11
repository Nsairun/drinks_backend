const express = require("express");
const Category = require("../dataBase/category");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = await Category.findAll();
  res.send(category);
});

router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  res.send(category);
});

router.put("/:id", async function (req, res) {
  const { name, description } = req.body;
  if (name && description) {
    await Category.update(req.body, { where: { id: req.params.id } });
    const updateCategoryData = await Category.findByPk(req.params.id);
    res.send(updateCategoryData);
  }
});
router.patch("/:id", async function (req, res) {
  await Category.update(req.body, { where: { id: req.params.id } });
  const category = await Category.findByPk(req.params.id);
  res.send(category);
});
router.delete("/:id", async function (req, res) {
   await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send("success");
});

module.exports = router;
