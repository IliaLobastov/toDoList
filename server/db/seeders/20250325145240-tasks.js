'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        rolename: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        rolename: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        rolename: 'manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('Themes', [
      {
        id: 1,
        theme: 'light',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        theme: 'dark',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        username: 'fixer',
        email: 'fixer@fixer.ru',
        pass: await bcrypt.hash('123', 10),
        roleId: 1,
        themeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'ilya',
        email: 'ilya@ilya.ru',
        pass: await bcrypt.hash('321', 10),
        roleId: 1,
        themeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          id: 1,
          header: 'TodoList',
          description:
            'Сделать клиент-серверное приложение TodoList с использованием React и Redux',
          priority: 5,
          status: false,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          header: 'Клиент',
          description: 'Накидать клиентскую часть',
          priority: 4,
          userId: 2,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          header: 'React Redux',
          description: 'Повторить Redux',
          priority: 3,
          userId: 2,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          header: 'TypeScript',
          description: 'Отдебажить все ошибки в TypeScript',
          priority: 2,
          userId: 2,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          header: 'Ping-pong',
          description: 'Поиграть в настольный теннис с друзьями',
          priority: 1,
          userId: 1,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
