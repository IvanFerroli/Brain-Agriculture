/**
 * Comando responsável por solicitar a exclusão de uma fazenda pelo ID.
 * 
 * Utilizado pelo padrão CQRS para desacoplar a intenção da lógica de execução.
 */
export class DeleteFazendaCommand {
  /**
   * ID da fazenda a ser removida.
   * @param id Identificador único da fazenda.
   */
  constructor(public readonly id: string) {}
}
