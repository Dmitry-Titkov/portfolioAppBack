"use strict";
module.exports = (sequelize, DataTypes) => {
  const ReviewModel = sequelize.define(
    "review",
    {
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {}
  );
  ReviewModel.associate = function (models) {
    ReviewModel.belongsTo(models.user);
    ReviewModel.belongsTo(models.auction);
  };
  return ReviewModel;
};
