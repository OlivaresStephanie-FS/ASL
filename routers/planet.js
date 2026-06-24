const express = require("express");

// Load in our controller/action instances
const planetCtrl = require("../controllers/planet.js");
const { uploadPlanet } = require("../middlewares");

// Create a new Router instance and call it "router"
const router = new express.Router();

// JSON API routes
router.get("/", planetCtrl.index);
router.post("/", planetCtrl.create, uploadPlanet);

// HTML5 / Twig routes
router.get("/new", planetCtrl.form);
router.get("/:id(\\d+)/edit", planetCtrl.form);
router.get("/:id(\\d+)/delete", planetCtrl.remove);
router.post("/:id(\\d+)", planetCtrl.update, uploadPlanet);

// JSON API routes with :id
router.get("/:id(\\d+)", planetCtrl.show);
router.put("/:id(\\d+)", planetCtrl.update);
router.delete("/:id(\\d+)", planetCtrl.remove);

module.exports = router;