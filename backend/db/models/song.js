'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25]
      },
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25]
      },
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Song.associate = function(models) {
    Song.hasMany(models.Like,{foreignKey:"songId", onDelete:"cascade",hooks:true})
  };
  return Song;
};

