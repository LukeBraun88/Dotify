'use strict';
const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },


  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.User, {foreignKey: "userId"})
    Like.belongsTo(models.Song, {foreignKey: "songId"})
  };
  return Like;
},
{
  indexes: [
    // Create a unique index on email
    {
      unique: true,
      fields: ['songId', 'userId']
    },
  ]};

