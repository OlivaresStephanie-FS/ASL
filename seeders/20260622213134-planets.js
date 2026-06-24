'use strict';

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Planets", [
			{
				id: 1,
				name: "Earth",
				size: 5,
				description: "The planet we live on.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Mars",
				size: 4,
				description: "A red planet near Earth.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Planets", null, {});
	},
};
