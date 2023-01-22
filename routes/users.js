const express = require("express");
const { createUser, getUsers, getUser, loginUser, deleteUser, patchUser } = require("../controllers/userController");

const router = express.Router();

// GET all users
router.get("/", getUsers);

// GET a single user
router.get("/:id", getUser);

// LOGIN user
router.post("/login", loginUser);

// POST a new user
router.post("/", createUser);

// DELETE a user
router.delete("/:id", deleteUser);

// UPDATE a user
router.patch("/:id", patchUser);

module.exports = router;
