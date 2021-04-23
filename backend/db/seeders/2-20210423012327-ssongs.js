'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [{
      name: 'Lucille',
      artist: 'B.B. King',
      filePath: 'https://lukes-bucket-88.s3.amazonaws.com/B.B.+King+-+Lucille.mp3' ,
      key: 'B.B. King - Lucille.mp3',
      userId: 1,
    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
