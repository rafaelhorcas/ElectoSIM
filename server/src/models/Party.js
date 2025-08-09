const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Party extends Model {}

  Party.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acronym: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Party',
  });

  return Party;
};
