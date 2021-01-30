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

  },
    {
      uniqueKeys: {
        actions_unique: {
          fields: ['userId', 'songId']
        }
      }
    }
  );

  Like.associate = function(models) {
    Like.belongsTo(models.User, {foreignKey: "userId"})
    Like.belongsTo(models.Song, {foreignKey: "songId"})
  };
  return Like;

}
