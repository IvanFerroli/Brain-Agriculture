import { CreateCulturaDto } from '../dto/create-cultura.dto';

/**
 * @module Cultura
 * @category Command
 *
 * @description
 * Comando usado para transportar os dados necessários à atualização
 * parcial de uma cultura já existente.
 *
 * Este comando é utilizado pelo `UpdateCulturaHandler`.
 */
export class UpdateCulturaCommand {
  /**
   * @param id ID da cultura a ser atualizada
   * @param data Dados parciais para atualização (ex: nome ou safraId)
   */
  constructor(
    public readonly id: string,
    public readonly data: Partial<CreateCulturaDto>,
  ) {}
}
