import { body } from 'express-validator';

export const CreateCitacaoValidator = [
  body('titulo').notEmpty().isString(),
  body('id_colecao').notEmpty().isInt(),
];

export const UpdateCitacaoValidator = [
  body('titulo').optional().isString().isLength({ min: 3, max: 255 }),
  body('id_colecao').optional().isNumeric().isInt(),
];

export const GetCitacaoValidator = [
  body('titulo').optional().isString().isLength({ max: 255 }),
]