const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authorizedMiddleware = require("../middlewares/authorized.middleware");

// Get

router.get("/alarms", authorizedMiddleware); // Get alarms list
router.get("/alarm/:id", authorizedMiddleware); // Get alarm by id

router.get("/items", authorizedMiddleware); // Get saved coins item list
router.get("/item/:id", authorizedMiddleware); // Get saved coins item by item id

// Create
router.post("/alarm", authorizedMiddleware); // Create new alarm
router.post("/item", authorizedMiddleware); // Create news coin item


// Delete
router.delete("/alarm/:id", authorizedMiddleware); // Delete alarm
router.delete("/item/:id", authorizedMiddleware); // Delete coin

module.exports = router;