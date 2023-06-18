import { body } from 'express-validator';

export const CreateCitacaoValidator = [ // Validador de titulo e id_colecao, para insersão de um novo registro no banco de daos
  body('titulo').notEmpty().isString(), // Verifica se o corpo do titulo não é vázio e é composto por apenas strings.
  body('id_colecao').notEmpty().isInt(),// Verifica se o corpo de id_colecao não é vazia e se ela é composta apenas por tipos Inteiros
];

export const UpdateCitacaoValidator = [ // validador de titulo e id_colecao, para update no banco de dados
  body('titulo').optional().isString().isLength({ min: 3, max: 255 }),/*Diz que o corpo do titulo pode ser vazio,mas caso não seja
  ele deve possuir apenas string, e ter um tamanho minimo de 3 caracteres e um máximo de 255 caracteres */
  body('id_colecao').optional().isNumeric().isInt(),/*Diz que o corpo do id_titulo pode ser vazio,mas caso não seja
  ele deve possuir apenas numéros e esses números devem ser inteiros */
];

export const GetCitacaoValidator = [ // validador de retorno da funcao getCitacaoValidador
  body('titulo').optional().isString().isLength({ max: 255 }),/* verifica se o corpo do titulo, ele pode ser vazio, mas
  caso não seja, deve conter apenas string e possuir um tamanho máximo de 255 caracteres*/
]