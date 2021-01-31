'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: "demo88",
        email: "demo@user.com",
        hashedPassword: "demo",
        profileImageUrl: "https://lukes-bucket-88.s3.amazonaws.com/profile-default.jpg"
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
