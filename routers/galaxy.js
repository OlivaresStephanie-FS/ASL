const express = require("express");

const galaxyCtrl = require("../controllers/galaxy.js");

const router = new express.Router();

router.get("/", galaxyCtrl.index);
router.post("/", galaxyCtrl.create);

router.get("/new", galaxyCtrl.form);
router.get("/:id(\\d+)/edit", galaxyCtrl.form);
router.get("/:id(\\d+)/delete", galaxyCtrl.remove);
router.post("/:id(\\d+)", galaxyCtrl.update);

router.get("/:id(\\d+)", galaxyCtrl.show);
router.put("/:id(\\d+)", galaxyCtrl.update);
router.delete("/:id(\\d+)", galaxyCtrl.remove);

module.exports = router;