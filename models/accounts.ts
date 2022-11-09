'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class accounts extends Model {
        static associate(models) {}
    }

    accounts.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            branch: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            account: {
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
            modelName: 'accounts',
        }
    );

    return accounts;
};
