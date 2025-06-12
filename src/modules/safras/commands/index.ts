import { CreateSafraHandler } from './create-safra.handler';
import { UpdateSafraHandler } from './update-safra.handler';
import { DeleteSafraHandler } from './delete-safra.handler';

/**
 * Array com todos os command handlers da entidade Safra.
 * Usado para registro no módulo CQRS.
 */
export const commandHandlers = [
  CreateSafraHandler,
  UpdateSafraHandler,
  DeleteSafraHandler,
];

export * from './create-safra.command';
export * from './update-safra.command';
export * from './delete-safra.command';
export * from './create-safra.handler';
export * from './update-safra.handler';
export * from './delete-safra.handler';
