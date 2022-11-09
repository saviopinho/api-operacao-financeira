'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cards', {
            id: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            number: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cvv: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            accountId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            document: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('cards');
    },
};
