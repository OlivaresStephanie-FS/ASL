const express = require("express");

// Load in our controller/action instances
const starCtrl = require("../controllers/star.js");
const { uploadStar } = require("../middlewares");

// Create a new Router instance and call it "router"
const router = new express.Router();

// JSON API routes
router.get("/", starCtrl.index);
router.post("/", starCtrl.create, uploadStar);

// HTML5 / Twig routes
router.get("/new", starCtrl.form);
router.get("/:id(\\d+)/edit", starCtrl.form);
router.get("/:id(\\d+)/delete", starCtrl.remove);
router.post("/:id(\\d+)", starCtrl.update, uploadStar);

// JSON API routes with :id
router.get("/:id(\\d+)", starCtrl.show);
router.put("/:id(\\d+)", starCtrl.update);
router.delete("/:id(\\d+)", starCtrl.remove);

module.exports = router;