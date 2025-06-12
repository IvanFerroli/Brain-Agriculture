/**
 * Query responsável por buscar uma fazenda pelo seu ID.
 * 
 * Utilizada no padrão CQRS para recuperar uma entidade específica.
 */
export class FindFazendaByIdQuery {
  /**
   * @param id Identificador único da fazenda a ser buscada.
   */
  constructor(public readonly id: string) {}
}
