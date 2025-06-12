import { CreateFazendaDto } from '../dto';

/**
 * Comando responsável por criar uma nova fazenda.
 * 
 * Utiliza o padrão CQRS para separar a intenção da lógica de execução.
 */
export class CreateFazendaCommand {
  /**
   * @param data Dados da nova fazenda, validados via DTO.
   */
  constructor(public readonly data: CreateFazendaDto) {}
}
