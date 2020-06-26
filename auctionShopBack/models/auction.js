"use strict";
module.exports = (sequelize, DataTypes) => {
  const AuctionModel = sequelize.define(
    "auction",
    {
      description: { type: DataTypes.STRING, allowNull: false },
      date_end: { type: DataTypes.DATE, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      minimum_bid: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  AuctionModel.associate = (models) => {
    AuctionModel.belongsTo(models.user);
    AuctionModel.hasMany(models.bid);
  };
  return AuctionModel;
};
