'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [3,25]
      }
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [3, 25]
      }
    }
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, {foreignKey: "userId"})
    Like.belongsTo(models.Song, {foreignKey: "songId"})
  };
  return Like;
};
