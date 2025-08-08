const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Election extends Model {}

  Election.init({
    electionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM('General', 'Autonomic', 'European'),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Election',
  });

  return Election;
};