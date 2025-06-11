import { CreateProdutorDto } from '../dto/create-produtor.dto';

/**
 * Comando que representa a criação de um novo produtor.
 *
 * Esse comando é enviado ao CommandBus e tratado por um handler específico.
 */
export class CreateProdutorCommand {
  constructor(public readonly dto: CreateProdutorDto) {}
}
