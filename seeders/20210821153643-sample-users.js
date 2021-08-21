'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'kazu',
        age:   15,
        mail: 'taro@gmail.com',
        pass: 'tarotaro',
        color: '#3de3d8',
        secret: 'inu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kazu',
        age:   26,
        mail: 'kazu@gmail.com',
        pass: 'kazukazu',
        color: '#b9f0a5',
        secret: 'buta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Megumi',
        age:   44,
        mail: 'megumi@gmail.com',
        pass: 'megumegu',
        color: '#7b7ee3',
        secret: 'neko',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ren',
        age:   35,
        mail: 'ren@gmail.com',
        pass: 'renren',
        color: '#cc7ff0',
        secret: 'momo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hana',
        age:   23,
        mail: 'hana@gmail.com',
        pass: 'hanahana',
        color: '#f7f6a3',
        secret: 'kiji',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yuna',
        age:   67,
        mail: 'yuna@gmail.com',
        pass: 'yunayuna',
        color: '#ffcc80',
        secret: 'saru',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'shun',
        age:   85,
        mail: 'shun@gmail.com',
        pass: 'shunshun',
        color: '#ff9e80',
        secret: 'uma',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

