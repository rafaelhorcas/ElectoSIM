const fs = require('fs');
const path = require('path');

const { Circunscription, Party, Result, Election, sequelize } = require('./models');


async function main() {
  try {
    await sequelize.sync({ force: true });

    await Election.create({
      electionID: 1,
      type: 'General',
      date: new Date('2023-07-23'),
    });
    const circunscriptionsDataPath = path.join(__dirname, 'circunscriptions.json');
    const resultsDataPath = path.join(__dirname, 'results.json');
    
    const circunscriptionsData = JSON.parse(fs.readFileSync(circunscriptionsDataPath, 'utf8'));
    const resultsData = JSON.parse(fs.readFileSync(resultsDataPath, 'utf8'));

    // Insertar las circunscripciones
    await Circunscription.bulkCreate(circunscriptionsData, {
      ignoreDuplicates: true, // evita error si ya existen con misma PK
    });

    // Insertar los partidos
    const partySet = new Set();

    const partidosData = resultsData
      .map(({ name, acronym }) => ({ name, acronym }))
      .filter(({ acronym }) => {
        if (partySet.has(acronym)) return false;
        partySet.add(acronym);
        return true;
      });

    await Party.bulkCreate(partidosData, {
      ignoreDuplicates: true, // evita error si ya existen con misma PK
    });

    // Insertar los resultados
    const resultsDataToInsert = resultsData.map(result => ({
      partyID: result.acronym, // Usamos acronym como la relación
      circunscriptionID: result.circunscriptionID,
      votes: result.votes,
    }));

    // Insertar en Result
    await Result.bulkCreate(resultsDataToInsert);

    await sequelize.close();
  } catch (error) {
    console.error('Error durante la importación:', error);
  }
}

main();
