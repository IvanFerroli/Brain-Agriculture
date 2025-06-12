/**
 * Comando responsável por atualizar os dados de uma fazenda existente.
 * 
 * Utilizado no padrão CQRS para desacoplar a intenção de atualização
 * da execução em si (handler).
 */
export class UpdateFazendaCommand {
  /**
   * ID da fazenda a ser atualizada.
   */
  constructor(
    public readonly id: string,

    /**
     * Dados parciais que serão atualizados na fazenda.
     */
    public readonly data: {
      nome?: string;
      areaTotal?: number;
      areaAgricultavel?: number;
      areaVegetacao?: number;
    },
  ) {}
}
