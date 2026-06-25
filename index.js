// Load in our Express framework
const express = require("express");
const { Star } = require("./models");
const twig = require("twig");

const fileUpload = require("express-fileupload");


// Create a new Express instance called "app"
const app = express();
app.use(express.static("public"));

// Load in our body-parser middleware
const bodyParser = require("body-parser"); // Import the 'body-parser' middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Enable file upload
app.use(fileUpload());

// Configure Twig
app.set("view engine", "twig"); // Set the view engine to Twig for rendering templates
app.set("views", __dirname + "/views"); // Set the directory for Twig templates

// Load in our RESTful routers
const routers = require("./routers/index.js");

// Home page welcome middleware
app.get("/", async (req, res) => { // Handle the root route ("/") and render the home page
	const star = await Star.findOne();

	res.status(200).render("home/home", {
		star: star || { name: "No star found" },
	});
});

// Register our RESTful routers with our "app"
app.use("/planets", routers.planet);
app.use("/stars", routers.star);
app.use("/galaxies", routers.galaxy);

// Set our app to listen on port 3000
app.listen(3000);
