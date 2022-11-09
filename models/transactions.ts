'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class transactions extends Model {
        static associate(models) {}
    }

    transactions.init(
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
            },
            value: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            accountId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            reversedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'transactions',
        }
    );

    return transactions;
};
