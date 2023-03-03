/**
 * User routes
 */
const { Router } = require("express");
const { User } = require("../../models");

const router = Router();

router.get("/", async (req, res) => {
  const { order = {}, page, items_per_page = 30, ...filters } = req.query;
  const options = {
    where: filters,
    order: Object.entries(order),
  };

  if (page) {
    options.offset = (page - 1) * items_per_page;
    options.limit = items_per_page;
  }

  const users = await User.findAll(options);

  res.json(users);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

router.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
