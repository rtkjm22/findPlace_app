"use strict";

module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lng: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validator: {
              notEmpty: {
                msg: "緯度が入力されていません。"
            },
            notNull: {
                msg: "緯度を入力してください。"
            },
            len: {
                args: [1, 50],
                msg: "緯度は1文字以上50文字未満で入力してください。"
            },
            isFloat: {
              msg: "緯度を入力してください。"
            }
          }
        },
        lat: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validator: {
              notEmpty: {
                msg: "経度が入力されていません。"
            },
            notNull: {
                msg: "経度を入力してください。"
            },
            len: {
                args: [1, 50],
                msg: "経度は1文字以上50文字未満で入力してください。"
            },
            isFloat: {
              msg: "経度を入力してください。"
            }
          }
        }
    }, {});
    History.associate = function (models) {
        History.belongsTo(models.User);
    };
    return History;
}