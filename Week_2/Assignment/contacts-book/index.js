const express = require("express");
const {
	contacts,
	sortContacts,
	filterContacts,
	Pager,
} = require("@jworkman-fs/asl");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let contactData = [...contacts];

function getNextId() { // Get the maximum existing ID and add 1 to it
	return Math.max(...contactData.map((contact) => Number(contact.id))) + 1;
}

function applyFiltering(results, req) { // Get filter criteria from headers
	const by = req.headers["x-filter-by"];
	const operator = req.headers["x-filter-operator"];
	const value = req.headers["x-filter-value"];

	if (!by || !operator || !value) {
		return { results, wasFiltered: false };
	}

	const filtered = results.filter((contact) => { // Get the value of the specified field from the contact
		const contactValue = contact[by];

		switch (operator) { // Apply the specified operator to compare the contact value with the filter value
			case "eq":
				return contactValue == value;
			case "gt":
				return contactValue > value;
			case "gte":
				return contactValue >= value;
			case "lt":
				return contactValue < value;
			case "lte":
				return contactValue <= value;
			default:
				return true;
		}
	});

	filtered.sort((a, b) => Number(a.id) - Number(b.id)); // Sort the filtered results by ID in ascending order

	return { results: filtered, wasFiltered: true };
}

function applySorting(results, req) { // Get sorting criteria from query parameters
	const sort = req.query.sort;
	const direction = req.query.direction || "asc";

	if (!sort) {
		return results;
	}

	try {
		return sortContacts(results, sort, direction);
	} catch (error) {
		return results;
	}
}

function applyPagination(results, req) { // Get pagination criteria from query parameters
	const page = Number(req.query.page || 1);
	const limit = Number(req.query.limit || 10);

	try {
		const pager = new Pager(results, page, limit);
		return pager.paginate();
	} catch (error) {
		const start = (page - 1) * limit;
		const end = start + limit;
		return results.slice(start, end);
	}
}

app.get("/v1/contacts", (req, res) => { // Start with the full contact data
	let results = [...contactData];

	const filteredData = applyFiltering(results, req);
	results = filteredData.results;

	results = applySorting(results, req);
	results = applyPagination(results, req);

	res.status(200).json(results);
});

app.get("/v1/contacts/:id", (req, res) => { //	Get the contact ID from the request parameters and find the corresponding contact in the data
	const id = Number(req.params.id);
	const contact = contactData.find((item) => Number(item.id) === id);

	if (!contact) {
		return res.status(404).json({
			message: "Contact not found",
		});
	}

	res.status(200).json(contact);
});

app.post("/v1/contacts", (req, res) => { // Create a new contact object using the data from the request body and assign it a unique ID
	const newContact = {
		id: getNextId(),
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		phone: req.body.phone,
		birthday: req.body.birthday,
	};

	contactData.push(newContact);

	res.status(303)
		.set("Location", `/v1/contacts/${newContact.id}`)
		.json(newContact);
});

app.put("/v1/contacts/:id", (req, res) => { // Get the contact ID from the request parameters and find the corresponding contact in the data
	const id = Number(req.params.id);
	const index = contactData.findIndex((item) => Number(item.id) === id);

	if (index === -1) {
		return res.status(404).json({
			message: "Contact not found",
		});
	}

	contactData[index] = {
		...contactData[index],
		fname: req.body.fname ?? contactData[index].fname,
		lname: req.body.lname ?? contactData[index].lname,
		email: req.body.email ?? contactData[index].email,
		phone: req.body.phone ?? contactData[index].phone,
		birthday: req.body.birthday ?? contactData[index].birthday,
		id,
	};

	res.status(200).json(contactData[index]);
});

app.delete("/v1/contacts/:id", (req, res) => { // Get the contact ID from the request parameters and find the corresponding contact in the data
	const id = Number(req.params.id);
	const index = contactData.findIndex((item) => Number(item.id) === id);

	if (index === -1) {
		return res.status(404).json({
			message: "Contact not found",
		});
	}

	contactData.splice(index, 1);

	res.status(204).send();
});

app.use((req, res) => {
	res.status(404).json({
		message: "Resource not found",
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
