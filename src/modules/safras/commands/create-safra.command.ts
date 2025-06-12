import { CreateSafraDto } from '../dto/create-safra.dto';

/**
 * Comando que representa a criação de uma nova safra.
 *
 * Esse comando é enviado ao CommandBus e tratado por um handler específico.
 */
export class CreateSafraCommand {
  constructor(public readonly dto: CreateSafraDto) {}
}
