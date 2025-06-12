import { CreateFazendaHandler } from './create-fazenda.handler';
import { UpdateFazendaHandler } from './update-fazenda.handler';
import { DeleteFazendaHandler } from './delete-fazenda.handler';

/**
 * Array de handlers de comandos da entidade Fazenda, usado no módulo CQRS.
 */
export const commandHandlers = [
  CreateFazendaHandler,
  UpdateFazendaHandler,
  DeleteFazendaHandler,
];

export * from './create-fazenda.command';
export * from './update-fazenda.command';
export * from './delete-fazenda.command';
export * from './create-fazenda.handler';
export * from './update-fazenda.handler';
export * from './delete-fazenda.handler';
