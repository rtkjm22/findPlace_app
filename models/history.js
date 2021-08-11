"use strict";

module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        userId: DataTypes.INTEGER,
        lng: DataTypes.INTEGER,
        lat: DataTypes.INTEGER
    }, {});
    History.associate = function (models) {
        History.belongsTo(models.User);
    };
    return History;
}