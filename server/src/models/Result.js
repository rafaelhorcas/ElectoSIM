const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Result extends Model {}

  Result.init({
    partyID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Party',
        key: 'acronym',
      },
    },
    circunscriptionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Circunscription',
        key: 'circunscriptionID',
      },
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Result',
  });


  return Result;
};
