import { Router } from 'express';

const electionController = require('../controllers/electionController');
const circunscriptionController = require('../controllers/circunscriptionController');
const partyController = require('../controllers/partyController');
const resultController = require('../controllers/resultController')

const router = Router();

// Elections routes
router.get('/elections', electionController.getAllElections);
router.get('/elections/:id', electionController.getElectionById);

// Circunscriptions routes
router.get('/circunscriptions', circunscriptionController.getAllCircunscriptions);
router.get('/circunscriptions/:id', circunscriptionController.getCircunscriptionById);

// Parties routes
router.get('/parties', partyController.getAllParties);
router.get('/parties/:id', partyController.getPartyById);

// Results routes
router.get('/results', resultController.getAllResults);
router.get('/results/:id', resultController.getResultById);
router.get('/results/circunscription/:circunscriptionID', resultController.getResultsByCircunscriptionID);

router.get('/results/simulation/dhondt/:circunscriptionID', resultController.getResultSimulatuionDhont);
router.get('/results/simulation/saintelague/:circunscriptionID', resultController.getResultSimulatuionSaintLague);

export default router;
