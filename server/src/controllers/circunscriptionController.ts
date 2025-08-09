import { Request, Response } from 'express';

// Cargamos el modelo JS
const db = require('../models');
const Circunscription = db.Circunscription;

export const getAllCircunscriptions = async (_req: Request, res: Response) => {
  try {
    const result = await Circunscription.findAll();
    res.json(result);
  } catch (error) {
    console.error('Error al obtener circunscripciones:', error);
    res.status(500).json({ error: 'Error al obtener las circunscripciones' });
  }
  return;
};

export const getCircunscriptionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Circunscription.findByPk(id);
    if (!result) {
      return res.status(404).json({ error: 'Circunscripción no encontrada' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error al obtener la circunscripción:', error);
    res.status(500).json({ error: 'Error al obtener la circunscripción' });
  }
  return;
};
