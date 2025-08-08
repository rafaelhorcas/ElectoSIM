import { Request, Response } from 'express';

const db = require('../models');
const Election = db.Election;

export const getAllElections = async (_req: Request, res: Response) => {
  try {
    const result = await Election.findAll();
    res.json(result);
  } catch (error) {
    console.error('Error al obtener circunscripciones:', error);
    res.status(500).json({ error: 'Error al obtener las circunscripciones' });
  }
};

export const getElectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const election = await Election.findByPk(id);
    if (!election) {
      return res.status(404).json({ error: 'Elección no encontrada' });
    }
    res.json(election);
  } catch (error) {
    console.error('Error al obtener la elección:', error);
    res.status(500).json({ error: 'Error al obtener la elección' });
  }
  return;
};