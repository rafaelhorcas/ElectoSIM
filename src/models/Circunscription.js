const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Circunscription extends Model {}

  Circunscription.init({
    circunscriptionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    electionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voters: DataTypes.INTEGER,
    valid_votes: DataTypes.INTEGER,
    blank_votes: DataTypes.INTEGER,
    invalid_votes: DataTypes.INTEGER,
    votes_cand: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Circunscription',
  });

  return Circunscription;
};
