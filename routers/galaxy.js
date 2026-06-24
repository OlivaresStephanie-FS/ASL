const express = require("express");

// Load in our controller/action instances
const galaxyCtrl = require("../controllers/galaxy.js");
const { uploadGalaxy } = require("../middlewares");

// Create a new Router instance and call it "router"
const router = new express.Router();

// JSON API routes
router.get("/", galaxyCtrl.index);
router.post("/", galaxyCtrl.create, uploadGalaxy);

// HTML5 / Twig routes
router.get("/new", galaxyCtrl.form);
router.get("/:id(\\d+)/edit", galaxyCtrl.form);
router.get("/:id(\\d+)/delete", galaxyCtrl.remove);
router.post("/:id(\\d+)", galaxyCtrl.update, uploadGalaxy);

// JSON API routes with :id
router.get("/:id(\\d+)", galaxyCtrl.show);
router.put("/:id(\\d+)", galaxyCtrl.update);
router.delete("/:id(\\d+)", galaxyCtrl.remove);

module.exports = router;