"use strict";

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "名前を入力してください。"
                },
                notNull: {
                    msg: "名前を入力してください。"
                },
                len: {
                    args: [1, 20],
                    msg: "名前は1〜20文字以内で入力してください。"
                },
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "年齢を入力してください。"
                },
                notNull: {
                    msg: "年齢を入力してください。"
                },
                isInt: {
                    msg: "数字(整数)を入力してください。"
                },
                min: {
                    args: [1],
                    msg: "1以上の数字(整数)が必要です。"
                },
                max: {
                    args: [120],
                    msg: "120以下の数字(整数)が必要です。"
                }
            }
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "メールアドレスを入力してください。"
                },
                notNull: {
                    msg: "メールアドレスを入力してください。"
                },
                isEmail: {
                    msg: "メールアドレス形式で入力してください。"
                },
                len: {
                    args: [1, 50],
                    msg: "メールアドレスは1〜50文字以内で入力してください。"
                },
            }
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "パスワードが入力されていません。"
                },
                notNull: {
                    msg: "パスワードを入力してください。"
                },
                len: {
                    args: [8, 70],
                    msg: "パスワードは8文字以上60文字未満で入力してください。"
                },
                not: {
                    args: ["\$[0-9].\$[0-9].\$[0-9a-zA-Z+-=.\/]+", "i"],
                    msg: "パスワードの形式が正しくありません。"
                }
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "イメージカラーを選択してください。"
                },
                notNull: {
                    msg: "イメージカラーを選択してください。"
                },
                len: {
                    args: [1, 20],
                    msg: "イメージカラーを選択してください。"
                },
            }
        },
        secret: {
            type:  DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "秘密の合言葉を入力してください。"
                },
                notNull: {
                    msg: "秘密の合言葉を入力してください。"
                },
                len: {
                    args: [1, 20],
                    msg: "秘密の合言葉は1〜20文字以内で入力してください。"
                },
            }
        }
    }, {});
    User.associate = function (models) {
    // User.hasMany(models.History);
    };
    return User;
}