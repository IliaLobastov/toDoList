'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate({ User }) {
      this.hasMany(User, { foreignKey: 'themeId' });
    }
  }
  Theme.init({
    theme: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Theme',
  });
  return Theme;
};