'use strict';

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Stars", [
			{
				id: 1,
				name: "Sun",
				size: 10,
				description: "The star at the center of our solar system.",
				GalaxyId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Sirius",
				size: 20,
				description: "One of the brightest stars in the night sky.",
				GalaxyId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Stars", null, {});
	},
};
