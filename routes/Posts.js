const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { Posts } = require("../controllers/Posts/PostsController");
const { Post } = require("../controllers/Posts/PostController");

router.get("/", Posts);
router.get("/:id", Post);

module.exports = router;