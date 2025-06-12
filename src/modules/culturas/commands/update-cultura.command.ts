import { CreateCulturaDto } from '../dto/create-cultura.dto';

/**
 * Comando usado para atualizar uma cultura existente.
 */
export class UpdateCulturaCommand {
  constructor(
    public readonly id: string,
    public readonly data: Partial<CreateCulturaDto>,
  ) {}
}
