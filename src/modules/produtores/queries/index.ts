import { FindAllProdutoresHandler } from './find-all-produtores.handler';
import { FindProdutorByIdHandler } from './find-produtor-by-id.handler';

export const queryHandlers = [
  FindAllProdutoresHandler,
  FindProdutorByIdHandler,
];

export * from './find-all-produtores.query';
export * from './find-produtor-by-id.query';
export * from './find-all-produtores.handler';
export * from './find-produtor-by-id.handler';
