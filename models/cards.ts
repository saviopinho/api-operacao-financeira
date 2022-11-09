'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class cards extends Model {
        static associate(models) {}
    }

    cards.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cvv: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            accountId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            document: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'cards',
        }
    );

    return cards;
};
