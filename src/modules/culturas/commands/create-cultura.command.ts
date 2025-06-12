import { CreateCulturaDto } from '../dto/create-cultura.dto';

/**
 * Comando que representa a criação de uma nova cultura.
 *
 * Esse comando é enviado ao CommandBus e tratado por um handler específico.
 */
export class CreateCulturaCommand {
  constructor(public readonly dto: CreateCulturaDto) {}
}
