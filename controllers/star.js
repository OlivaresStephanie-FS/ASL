const { Star, Galaxy, Planet } = require("../models");

const wantsJson = (req) => {
	const contentType = req.get("Content-Type") || "";
	return contentType.includes("application/json");
};

const index = async (req, res) => {
	const stars = await Star.findAll({
		include: [Galaxy, Planet],
	});

	if (wantsJson(req)) {
		return res.status(200).json(stars);
	}

	res.status(200).render("stars/index", { stars });
};

const show = async (req, res) => {
	const star = await Star.findByPk(req.params.id, {
		include: [Galaxy, Planet],
	});

	if (wantsJson(req)) {
		return res.status(200).json(star);
	}

	res.status(200).render("stars/show", { star });
};

const create = async (req, res, next) => {
	const star = await Star.create(req.body);

	req.starId = star.id;

	if (wantsJson(req)) {
		return res.status(201).json(star);
	}

	await next();
	res.redirect(302, `/stars/${star.id}`);
};

const update = async (req, res, next) => {
	const [updated] = await Star.update(req.body, {
		where: { id: req.params.id },
	});

	req.starId = req.params.id;

	if (wantsJson(req)) {
		return res.status(200).json({ updated });
	}

	await next();
	res.redirect(302, `/stars/${req.params.id}`);
};

const remove = async (req, res) => {
	const deleted = await Star.destroy({
		where: { id: req.params.id },
	});

	if (wantsJson(req)) {
		return res.status(200).json({ deleted });
	}

	res.redirect(302, "/stars");
};

const form = async (req, res) => {
	if (typeof req.params.id !== "undefined") {
		const star = await Star.findByPk(req.params.id);

		res.render("stars/_form.twig", { star });
	} else {
		res.render("stars/_form.twig", { star: null });
	}
};

module.exports = { index, show, create, update, remove, form };