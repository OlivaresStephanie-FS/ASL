const express = require("express");

const starCtrl = require("../controllers/star.js");

const router = new express.Router();

router.get("/", starCtrl.index);
router.post("/", starCtrl.create);

router.get("/new", starCtrl.form);
router.get("/:id(\\d+)/edit", starCtrl.form);
router.get("/:id(\\d+)/delete", starCtrl.remove);
router.post("/:id(\\d+)", starCtrl.update);

router.get("/:id(\\d+)", starCtrl.show);
router.put("/:id(\\d+)", starCtrl.update);
router.delete("/:id(\\d+)", starCtrl.remove);

module.exports = router;