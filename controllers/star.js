const { Star, Galaxy, Planet } = require("../models");

const index = async (req, res) => {
	const stars = await Star.findAll({
		include: [Galaxy, Planet],
	});

	res.status(200).json(stars);
};

const show = async (req, res) => {
	const star = await Star.findByPk(req.params.id, {
		include: [Galaxy, Planet],
	});

	res.status(200).json(star);
};

const create = async (req, res) => {
	const star = await Star.create(req.body);

	res.status(201).json(star);
};

const update = async (req, res) => {
	const [updated] = await Star.update(req.body, {
		where: { id: req.params.id },
	});

	res.status(200).json({ updated });
};

const remove = async (req, res) => {
	const deleted = await Star.destroy({
		where: { id: req.params.id },
	});

	res.status(200).json({ deleted });
};

module.exports = { index, show, create, update, remove };
