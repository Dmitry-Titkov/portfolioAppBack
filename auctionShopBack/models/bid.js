"use strict";
module.exports = (sequelize, DataTypes) => {
  const BidModel = sequelize.define(
    "bid",
    {
      date_placed: { type: DataTypes.DATE, allowNull: false },
      amount: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  BidModel.associate = function (models) {
    BidModel.belongsTo(models.auction);
    BidModel.belongsTo(models.user);
  };

  return BidModel;
};
