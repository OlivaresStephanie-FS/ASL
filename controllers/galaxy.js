const { Galaxy, Star } = require("../models");

const wantsJson = (req) => {
	const contentType = req.get("Content-Type") || "";
	return contentType.includes("application/json");
};

const index = async (req, res) => {
	const galaxies = await Galaxy.findAll({
		include: [Star],
	});

	if (wantsJson(req)) {
		return res.status(200).json(galaxies);
	}

	res.status(200).render("galaxies/index", { galaxies });
};

const show = async (req, res) => {
	const galaxy = await Galaxy.findByPk(req.params.id, {
		include: [Star],
	});

	if (wantsJson(req)) {
		return res.status(200).json(galaxy);
	}

	res.status(200).render("galaxies/show", { galaxy });
};

const create = async (req, res, next) => {
	const galaxy = await Galaxy.create(req.body);

	req.galaxyId = galaxy.id;

	if (wantsJson(req)) {
		return res.status(201).json(galaxy);
	}

	await next();
	res.redirect(302, `/galaxies/${galaxy.id}`);
};

const update = async (req, res, next) => {
	const [updated] = await Galaxy.update(req.body, {
		where: { id: req.params.id },
	});

	req.galaxyId = req.params.id;

	if (wantsJson(req)) {
		return res.status(200).json({ updated });
	}

	await next();
	res.redirect(302, `/galaxies/${req.params.id}`);
};

const remove = async (req, res) => {
	const deleted = await Galaxy.destroy({
		where: { id: req.params.id },
	});

	if (wantsJson(req)) {
		return res.status(200).json({ deleted });
	}

	res.redirect(302, "/galaxies");
};

const form = async (req, res) => {
	if (typeof req.params.id !== "undefined") {
		const galaxy = await Galaxy.findByPk(req.params.id);

		res.render("galaxies/_form.twig", { galaxy });
	} else {
		res.render("galaxies/_form.twig", { galaxy: null });
	}
};

module.exports = { index, show, create, update, remove, form };