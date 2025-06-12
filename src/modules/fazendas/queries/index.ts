import { FindAllFazendasHandler } from './find-all-fazenda.handler';
import { FindFazendaByIdHandler } from './find-fazenda-by-id.handler';

/**
 * Array de handlers de queries da entidade Fazenda.
 * Utilizado no módulo para registro no CQRS.
 */
export const queryHandlers = [
  FindAllFazendasHandler,
  FindFazendaByIdHandler,
];

export * from './find-all-fazenda.query';
export * from './find-fazenda-by-id.query';
export * from './find-all-fazenda.handler';
export * from './find-fazenda-by-id.handler';
