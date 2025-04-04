'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate({ User }) {
      this.hasMany(User, { foreignKey: 'roleId' });
    }
  }
  Role.init({
    rolename: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};