"use strict";
module.exports = (sequelize, DataTypes) => {
  const BidModel = sequelize.define(
    "bid",
    {
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
