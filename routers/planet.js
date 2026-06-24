const express = require("express");

const planetCtrl = require("../controllers/planet.js");

const router = new express.Router();

router.get("/", planetCtrl.index);
router.post("/", planetCtrl.create);

router.get("/new", planetCtrl.form);
router.get("/:id(\\d+)/edit", planetCtrl.form);
router.get("/:id(\\d+)/delete", planetCtrl.remove);
router.post("/:id(\\d+)", planetCtrl.update);

router.get("/:id(\\d+)", planetCtrl.show);
router.put("/:id(\\d+)", planetCtrl.update);
router.delete("/:id(\\d+)", planetCtrl.remove);

module.exports = router;