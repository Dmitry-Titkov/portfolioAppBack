"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    "user",
    {
      display_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  UserModel.associate = function (models) {
    UserModel.hasMany(models.auction);
    UserModel.hasMany(models.review);
    UserModel.hasMany(models.bid);
  };
  return UserModel;
};
