import { CreateCulturaHandler } from './create-cultura.handler';
import { UpdateCulturaHandler } from './update-cultura.handler';
import { DeleteCulturaHandler } from './delete-cultura.handler';

export const commandHandlers = [
  CreateCulturaHandler,
  UpdateCulturaHandler,
  DeleteCulturaHandler,
];

export * from './create-cultura.command';
export * from './update-cultura.command';
export * from './delete-cultura.command';
export * from './create-cultura.handler';
export * from './update-cultura.handler';
export * from './delete-cultura.handler';
