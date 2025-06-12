import { FindAllCulturaHandler } from './find-all-cultura.handler';
import { FindCulturaByIdHandler } from './find-cultura-by-id.handler';

export const queryHandlers = [
  FindAllCulturaHandler,
  FindCulturaByIdHandler,
];

export * from './find-all-cultura.query';
export * from './find-cultura-by-id.query';
export * from './find-all-cultura.handler';
export * from './find-cultura-by-id.handler';
