import { CreateProdutorDto } from '../dto/create-produtor.dto';

/**
 * Comando usado para atualizar um produtor existente.
 */
export class UpdateProdutorCommand {
  constructor(
    public readonly id: string,
    public readonly data: Partial<CreateProdutorDto>,
  ) {}
}
