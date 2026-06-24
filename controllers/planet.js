const path = require("path");
const { Planet, Star } = require("../models");

const wantsJson = (req) => {
	const contentType = req.get("Content-Type") || "";
	return contentType.includes("application/json");
};

const uploadPlanetImage = async (req, id) => {
	if (req.files && req.files.image) {
		const extension = path.extname(req.files.image.name) || ".jpg";

		await req.files.image.mv(
			`${__dirname}/../public/uploads/planets/${id}${extension}`
		);
	}
};

const index = async (req, res) => {
	const planets = await Planet.findAll({
		include: [Star],
	});

	if (wantsJson(req)) {
		return res.status(200).json(planets);
	}

	res.status(200).render("planets/index", { planets });
};

const show = async (req, res) => {
	const planet = await Planet.findByPk(req.params.id, {
		include: [Star],
	});

	if (wantsJson(req)) {
		return res.status(200).json(planet);
	}

	res.status(200).render("planets/show", { planet });
};

const create = async (req, res) => {
	const planet = await Planet.create(req.body);

	await uploadPlanetImage(req, planet.id);

	if (wantsJson(req)) {
		return res.status(201).json(planet);
	}

	res.redirect(302, `/planets/${planet.id}`);
};

const update = async (req, res) => {
	const id = req.params.id;

	const [updated] = await Planet.update(req.body, {
		where: { id },
	});

	await uploadPlanetImage(req, id);

	if (wantsJson(req)) {
		return res.status(200).json({ updated });
	}

	res.redirect(302, `/planets/${id}`);
};

const remove = async (req, res) => {
	const deleted = await Planet.destroy({
		where: { id: req.params.id },
	});

	if (wantsJson(req)) {
		return res.status(200).json({ deleted });
	}

	res.redirect(302, "/planets");
};

const form = async (req, res) => {
	if (typeof req.params.id !== "undefined") {
		const planet = await Planet.findByPk(req.params.id);
		res.render("planets/_form.twig", { planet });
	} else {
		res.render("planets/_form.twig", { planet: null });
	}
};

module.exports = { index, show, create, update, remove, form };