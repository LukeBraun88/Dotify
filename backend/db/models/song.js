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
    },
    userId: {
      type: DataTypes.INTEGER,
      // allowNull:false
    }
  }, {});

  Song.associate = function(models) {
    Song.hasMany(models.Like,{foreignKey:"songId", onDelete:"cascade",hooks:true})
    Song.belongsTo(models.User, { foreignKey: "userId" })
  };

  Song.upload = async function ({ name, artist, filePath, userId}) {
    const song = await Song.create({
      name,
      artist,
      filePath,
      userId
    });
    return await Song.findByPk(song.id);
  };

  return Song;
};
