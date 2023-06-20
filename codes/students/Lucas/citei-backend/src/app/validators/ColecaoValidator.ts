import { body, query } from 'express-validator';

export const CreateColecaoValidator = [
  body('titulo').notEmpty().isString().isLength({ max: 255 }),
  body('imagem').optional().isString().isLength({ max: 255 }),
  body('autor').notEmpty().isString().isLength({ max: 255 }),
  body('subtitulo').optional().isString().isLength({ max: 255 }),
];

export const UpdateColecaoValidator = [
  body('titulo').optional().isString().isLength({ max: 255 }),
  body('imagem').optional().isString().isLength({ max: 255 }),
  body('autor').optional().isString().isLength({ max: 255 }),
  body('subtitulo').optional().isString().isLength({ max: 255 }),
];


export const GetColecaoValidator = [
  query('titulo').optional().isString().isLength({ max: 255 }),
]