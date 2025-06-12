import { CreateFazendaDto } from '../dto/create-fazenda.dto';

/**
 * @module Fazenda
 * @category Command
 *
 * @description
 * Comando responsável por transportar os dados necessários para atualização
 * de uma fazenda rural. Utilizado no padrão CQRS para desacoplar a intenção
 * da execução, permitindo validação e controle no handler.
 */
export class UpdateFazendaCommand {
  /**
   * @param id ID da fazenda a ser atualizada
   * @param data Dados parciais a serem atualizados (nome, áreas, etc.)
   */
  constructor(
    public readonly id: string,
    public readonly data: Partial<CreateFazendaDto>,
  ) {}
}
