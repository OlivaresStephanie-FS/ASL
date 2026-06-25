const path = require("path"); // Node.js built-in module for handling file paths
const { Planet, Star } = require("../models");

const wantsJson = (req) => { // Check if the request wants a JSON response
	const contentType = req.get("Content-Type") || "";
	return contentType.includes("application/json");
};

const uploadPlanetImage = async (req, id) => { // Function to handle image upload for a planet
	if (req.files && req.files.image) {
		const extension = path.extname(req.files.image.name) || ".jpg";

		await req.files.image.mv(
			`${__dirname}/../public/uploads/planets/${id}${extension}`
		);
	}
};

const index = async (req, res) => { // Function to handle the index route for planets
	const planets = await Planet.findAll({
		include: [Star],
	});

	if (wantsJson(req)) {
		return res.status(200).json(planets);
	}

	res.status(200).render("planets/index", { planets });
};

const show = async (req, res) => { // Function to handle the show route for a specific planet
	const planet = await Planet.findByPk(req.params.id, {
		include: [Star],
	});

	if (wantsJson(req)) {
		return res.status(200).json(planet);
	}

	res.status(200).render("planets/show", { planet });
};

const create = async (req, res) => { // Function to handle the creation of a new planet
	const planet = await Planet.create(req.body);

	await uploadPlanetImage(req, planet.id);

	if (wantsJson(req)) {
		return res.status(201).json(planet);
	}

	res.redirect(302, `/planets/${planet.id}`);
};

const update = async (req, res) => { // Function to handle the update of an existing planet
	const id = req.params.id;

	const [updated] = await Planet.update(req.body, {
		where: { id },
	});

	await uploadPlanetImage(req, id);

	if (wantsJson(req)) {
		return res.status(200).json({ updated });
	}

	res.redirect(302, `/planets/${id}`); // Redirect to the updated planet's page
};

const remove = async (req, res) => { // Function to handle the deletion of a planet
	const deleted = await Planet.destroy({
		where: { id: req.params.id },
	});

	if (wantsJson(req)) {
		return res.status(200).json({ deleted });
	}

	res.redirect(302, "/planets");
};

const form = async (req, res) => { // Function to render the form for creating or editing a planet
	if (typeof req.params.id !== "undefined") {
		const planet = await Planet.findByPk(req.params.id);
		res.render("planets/_form.twig", { planet });
	} else {
		res.render("planets/_form.twig", { planet: null });
	}
};

module.exports = { index, show, create, update, remove, form };