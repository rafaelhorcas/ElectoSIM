const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('elections_db', 'rafa', 'xxxxxx', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Para evitar que se impriman todas las queries
});
module.exports = sequelize;

// Associate models
const Circunscription = require('./Circunscription')(sequelize);
const Election = require('./Election')(sequelize);
const Party = require('./Party')(sequelize);
const Result = require('./Result')(sequelize);

Party.belongsToMany(Circunscription, {
  through: 'Result',
  foreignKey: 'partyID',
  otherKey: 'circunscriptionID'
});

Circunscription.belongsToMany(Party, {
  through: 'Result',
  foreignKey: 'circunscriptionID',
  otherKey: 'partyID'
});

Circunscription.belongsTo(Election, {
  foreignKey: 'electionID',
  targetKey: 'electionID'
});

module.exports = {
  sequelize,
  Party,
  Circunscription,
  Election,
  Result,
};
