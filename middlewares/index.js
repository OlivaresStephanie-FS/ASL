const util = require("util"); // Import the 'util' module for utility functions
const path = require("path"); // Node.js built-in module for handling file paths

const uploadStar = async (req, res, next) => { // Middleware function to handle image upload for a star
	let uploadPath = `${__dirname}/../public/uploads/stars/%s%s`;

	if (!req.starId) {
		return next();
	}

	if (req.files && Object.keys(req.files).length > 0 && req.files.image) { // Check if there are files in the request and if an image file is present
		const extension = path.extname(req.files.image.name);
		uploadPath = util.format(uploadPath, req.starId, extension);

		await req.files.image.mv(uploadPath);
	}

	next();
};

const uploadGalaxy = async (req, res, next) => { // Middleware function to handle image upload for a galaxy
	let uploadPath = `${__dirname}/../public/uploads/galaxies/%s%s`;

	if (!req.galaxyId) {
		return next();
	}

	if (req.files && Object.keys(req.files).length > 0 && req.files.image) { // Check if there are files in the request and if an image file is present
		const extension = path.extname(req.files.image.name);
		uploadPath = util.format(uploadPath, req.galaxyId, extension);

		await req.files.image.mv(uploadPath);
	}

	next(); // Call the next middleware function in the stack
};

const uploadPlanet = async (req, res, next) => { // Middleware function to handle image upload for a planet
	let uploadPath = `${__dirname}/../public/uploads/planets/%s%s`;

	if (!req.planetId) { // Check if the planetId is not present in the request
		return next();
	}

	if (req.files && Object.keys(req.files).length > 0 && req.files.image) { // Check if there are files in the request and if an image file is present
		const extension = path.extname(req.files.image.name);
		uploadPath = util.format(uploadPath, req.planetId, extension);

		await req.files.image.mv(uploadPath);
	}

	next();
};

module.exports = { uploadStar, uploadGalaxy, uploadPlanet };