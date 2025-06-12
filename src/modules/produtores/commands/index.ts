import { CreateProdutorHandler } from './create-produtor.handler';
import { UpdateProdutorHandler } from './update-produtor.handler';
import { DeleteProdutorHandler } from './delete-produtor.handler';

export const commandHandlers = [
  CreateProdutorHandler,
  UpdateProdutorHandler,
  DeleteProdutorHandler,
];

export * from './create-produtor.command';
export * from './update-produtor.command';
export * from './delete-produtor.command';
export * from './create-produtor.handler';
export * from './update-produtor.handler';
export * from './delete-produtor.handler';
