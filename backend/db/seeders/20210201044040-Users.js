'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'trial88',
      email: 'trial@att.net',
      hashedPassword: 'trial88',
      profileImageUrl: 'https://lukes-bucket-88.s3.amazonaws.com/1611967431296.jpg'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
