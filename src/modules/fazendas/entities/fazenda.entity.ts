/**
 * Representa uma fazenda cadastrada no sistema.
 *
 * Essa classe é usada como referência de tipo em outras camadas da aplicação,
 * como services, controllers e DTOs.
 */
export class Fazenda {
  /**
   * Identificador único da fazenda (geralmente um UUID).
   * Pode ser gerado automaticamente pelo banco de dados ou via código.
   *
   * @example "b2a3c4e5-6789-4abc-a1f2-def4567890ab"
   */
  id?: string;

  /**
   * Nome da fazenda.
   *
   * @example "Fazenda Boa Esperança"
   */
  nome?: string;

  /**
   * Área total da fazenda em hectares.
   *
   * @example 100.5
   */
  areaTotal?: number;

  /**
   * Área agricultável da fazenda em hectares.
   *
   * @example 70.0
   */
  areaAgricultavel?: number;

  /**
   * Área de vegetação da fazenda em hectares.
   *
   * @example 25.5
   */
  areaVegetacao?: number;

  /**
   * ID do produtor proprietário da fazenda.
   *
   * @example "f8d4b5a3-1234-4e9a-bb1e-abcde1234567"
   */
  produtorId?: string;

  /**
   * Data de criação do registro da fazenda no sistema.
   */
  criadoEm?: Date;

  /**
   * Data da última atualização feita no registro da fazenda.
   */
  atualizadoEm?: Date;
}
