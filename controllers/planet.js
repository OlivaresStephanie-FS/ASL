const { Planet, Star } = require("../models");

const index = async (req, res) => {
	const planets = await Planet.findAll({
		include: [Star],
	});

	res.status(200).json(planets);
};

const show = async (req, res) => {
	const planet = await Planet.findByPk(req.params.id, {
		include: [Star],
	});

	res.status(200).json(planet);
};

const create = async (req, res) => {
	const planet = await Planet.create(req.body);

	res.status(201).json(planet);
};

const update = async (req, res) => {
	const [updated] = await Planet.update(req.body, {
		where: { id: req.params.id },
	});

	res.status(200).json({ updated });
};

const remove = async (req, res) => {
	const deleted = await Planet.destroy({
		where: { id: req.params.id },
	});

	res.status(200).json({ deleted });
};

module.exports = { index, show, create, update, remove };