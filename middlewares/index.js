const util = require("util");
const path = require("path");

const uploadStar = async (req, res, next) => {
	let uploadPath = `${__dirname}/../public/uploads/stars/%s%s`;

	if (!req.starId) {
		return next();
	}

	if (req.files && Object.keys(req.files).length > 0 && req.files.image) {
		const extension = path.extname(req.files.image.name);
		uploadPath = util.format(uploadPath, req.starId, extension);

		await req.files.image.mv(uploadPath);
	}

	next();
};

const uploadGalaxy = async (req, res, next) => {
	let uploadPath = `${__dirname}/../public/uploads/galaxies/%s%s`;

	if (!req.galaxyId) {
		return next();
	}

	if (req.files && Object.keys(req.files).length > 0 && req.files.image) {
		const extension = path.extname(req.files.image.name);
		uploadPath = util.format(uploadPath, req.galaxyId, extension);

		await req.files.image.mv(uploadPath);
	}

	next();
};

const uploadPlanet = async (req, res, next) => {
	let uploadPath = `${__dirname}/../public/uploads/planets/%s%s`;

	if (!req.planetId) {
		return next();
	}

	if (req.files && Object.keys(req.files).length > 0 && req.files.image) {
		const extension = path.extname(req.files.image.name);
		uploadPath = util.format(uploadPath, req.planetId, extension);

		await req.files.image.mv(uploadPath);
	}

	next();
};

module.exports = { uploadStar, uploadGalaxy, uploadPlanet };