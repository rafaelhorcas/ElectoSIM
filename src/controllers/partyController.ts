import { Request, Response } from 'express';

const db = require('../models');
const Party = db.Party;

export const getAllParties = async (_req: Request, res: Response) => {
  try {
    const result = await Party.findAll();
    res.json(result);
  } catch (error) {
    console.error('Error al obtener partidos:', error);
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
};

export const getPartyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const party = await Party.findByPk(id);
    if (!party) {
      return res.status(404).json({ error: 'Partido no encontrado' });
    }
    res.json(party);
  } catch (error) {
    console.error('Error al obtener el partido:', error);
    res.status(500).json({ error: 'Error al obtener el partido' });
  }
  return;
};