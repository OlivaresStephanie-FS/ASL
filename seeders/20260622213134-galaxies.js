'use strict';

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Galaxies", [
			{
				id: 1,
				name: "Milky Way",
				size: 100000,
				description: "The galaxy that contains our solar system.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Andromeda",
				size: 220000,
				description: "A large spiral galaxy near the Milky Way.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Galaxies", null, {});
	},
};
