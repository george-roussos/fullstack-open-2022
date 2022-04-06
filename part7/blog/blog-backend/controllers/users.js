const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const existingUser = await User.findOne({ username });
  const invalidUser = username.length < 3 ? true : false;
  const invalidPass = password.length < 3 ? true : false;
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }
  if (invalidUser || invalidPass) {
    return response.status(400).json({
      error: "Username and password must be longer than 3 characters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = usersRouter;
