'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        name: "Fur Elise",
        artist: "Beethoven",
        filePath: "/home/luke/WSL/AppAcademy/dotify/frontend/src/components/HomePage/Beethoven"
      },
      {
        name: "Summertime Sadness",
        artist: "Lana Del Ray",
        filePath: "/home/luke/WSL/AppAcademy/dotify/frontend/src/components/HomePage/Lana Del Rey"
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};



// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Users', [
//       {
//         email: 'demo@user.io',
//         username: 'Demo-lition',
//         hashedPassword: bcrypt.hashSync('password'),
//         // profileImageUrl: url(https://lukes-bucket-88.s3.amazonaws.com/profile+pic.jpg)
//       },
//       {
//         email: faker.internet.email(),
//         username: 'FakeUser1',
//         hashedPassword: bcrypt.hashSync(faker.internet.password()),
//       },
//       {
//         email: faker.internet.email(),
//         username: 'FakeUser2',
//         hashedPassword: bcrypt.hashSync(faker.internet.password()),
//       },
//     ], {});
//   },

//   down: (queryInterface, Sequelize) => {
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete('Users', {
//       username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
//     }, {});
//   }
// };
