import { CreateSafraDto } from '../dto/create-safra.dto';

/**
 * Comando usado para atualizar uma safra existente.
 */
export class UpdateSafraCommand {
  constructor(
    public readonly id: string,
    public readonly data: Partial<CreateSafraDto>,
  ) {}
}
