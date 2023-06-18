import { body, query } from 'express-validator';

export const CreateColecaoValidator = [// validador de criacao de novos registros no banco de dados
  body('titulo').notEmpty().isString().isLength({ max: 255 }),/*verifica se o titulo não é vazio(obrigatorio), se não for vazio, deve conter
  apenhas strings e o seu tamanho total deve ser de até 255 caracteres  */
  b
  ody('imagem').optional().isString().isLength({ max: 255 }),/*verifica se a possui imagem(o endereco dela), se sim, deve conter
  apenhas strings e o seu tamanho total deve ser de até 255 caracteres  */
  body('autor').notEmpty().isString().isLength({ max: 255 }),/*verifica se o autor não é vazio(obrigatorio), se não for vazio, deve conter
  apenhas strings e o seu tamanho total deve ser de até 255 caracteres  */
  body('subtitulo').optional().isString().isLength({ max: 255 }),/*verifica se a possui subtitulo, se sim, deve conter
  apenhas strings e o seu tamanho total deve ser de até 255 caracteres  */
];

export const UpdateColecaoValidator = [/*Valida a atualizacao de registros no banco de dados */
  body('titulo').optional().isString().isLength({ max: 255 }),/*O titulo é opcional, se conter algo, deve ser string e possuir um tamanho
  máximo de 255 caracteres */
  body('imagem').optional().isString().isLength({ max: 255 }),/*A imagem é opcional, se conter algo, deve ser string e possuir um tamanho
  máximo de 255 caracteres */
  body('autor').optional().isString().isLength({ max: 255 }),/* O autor é opcional, se conter algo, deve ser string e possuir um tamanho
  máximo de 255 caracteres */
  body('subtitulo').optional().isString().isLength({ max: 255 }),/*O subtitulo é opcional, se conter algo, deve ser string e possuir um tamanho
  máximo de 255 caracteres */
];


export const GetColecaoValidator = [// validador de retorno da funcao getColecaoValidador
  query('titulo').optional().isString().isLength({ max: 255 }),/* verifica se o corpo do titulo, ele pode ser vazio, mas
  caso não seja, deve conter apenas string e possuir um tamanho máximo de 255 caracteres*/
]