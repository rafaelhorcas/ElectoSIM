import { Request, Response } from 'express';
import { dhondt, sainteLague } from '../services/electoralmethods';
//import { sainteLague } from '../services/saintlague';

const db = require('../models');
const Result = db.Result;

export const getAllResults = async (_req: Request, res: Response) => {
  try {
    const result = await Result.findAll();
    res.json(result);
  } catch (error) {
    console.error('Error al obtener resultados:', error);
    res.status(500).json({ error: 'Error al obtener los resultados' });
  }
};

export const getResultById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Result.findByPk(id);
    if (!result) {
      return res.status(404).json({ error: 'Resultado no encontrado' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error al obtener el resultado:', error);
    res.status(500).json({ error: 'Error al obtener el resultado' });
  }
  return;
};

export const getResultsByCircunscriptionID = async (req: Request, res: Response) => {
  const { circunscriptionID } = req.params;
  try {
    const results = await Result.findAll({ where: { circunscriptionID }, order: [['votes', 'DESC']] });

    res.json(results);
  } catch (error) {
    console.error('Error al obtener los resultados por circunscripción:', error);
    res.status(500).json({ error: 'Error al obtener los resultados por circunscripción' });
  }
};

export const getResultSimulatuionDhont = async (req: Request, res: Response) => {
  const { circunscriptionID } = req.params;
  try {
    const results = await Result.findAll({ where: { circunscriptionID }, order: [['votes', 'DESC']] });

    const votesData = results.map((result: typeof Result) => ({
      party: result.partyID,
      votes: result.votes
    }));
    const totalSeats = 4;
    const dhondtResults = dhondt(votesData, totalSeats);
    //const sainteLagueResults = sainteLague(votesData, totalSeats);

    res.json(dhondtResults);
  } catch (error) {
    console.error('Error al obtener los resultados por circunscripción:', error);
    res.status(500).json({ error: 'Error al obtener los resultados por circunscripción' });
  }
};

export const getResultSimulatuionSaintLague = async (req: Request, res: Response) => {
  const { circunscriptionID } = req.params;
  try {
    const results = await Result.findAll({ where: { circunscriptionID }, order: [['votes', 'DESC']] });

    const votesData = results.map((result: typeof Result) => ({
      party: result.partyID,
      votes: result.votes
    }));
    const totalSeats = 4;
    const sainteLagueResults = sainteLague(votesData, totalSeats);

    res.json(sainteLagueResults);
  } catch (error) {
    console.error('Error al obtener los resultados por circunscripción:', error);
    res.status(500).json({ error: 'Error al obtener los resultados por circunscripción' });
  }
};
