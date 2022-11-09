'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class people extends Model {
        static associate(models) {}
    }

    people.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            document: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'people',
        }
    );

    return people;
};
