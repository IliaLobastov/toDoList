'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Theme, Role, Task }) {
      this.belongsTo(Theme, { foreignKey: 'themeId' });
      this.belongsTo(Role, { foreignKey: 'roleId' });
      this.hasMany(Task, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      pass: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      themeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
