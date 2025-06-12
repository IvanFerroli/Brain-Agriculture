/**
 * Representa uma cultura agrícola dentro do sistema.
 *
 * Essa classe é usada como referência de tipo em outras camadas da aplicação,
 * como services, controllers e DTOs.
 */
export class Cultura {
  /**
   * Identificador único da cultura (geralmente um UUID).
   * Pode ser gerado automaticamente pelo banco de dados ou via código.
   *
   * @example "cultura-uuid-1234"
   */
  id?: string;

  /**
   * Nome da cultura plantada.
   *
   * @example "Milho"
   */
  nome?: string;

  /**
   * ID da safra à qual essa cultura pertence.
   *
   * @example "safra-uuid-5678"
   */
  safraId?: string;

  /**
   * Data de criação do registro da cultura no sistema.
   * Preenchida automaticamente no momento da criação.
   */
  criadoEm?: Date;

  /**
   * Data da última atualização feita no registro da cultura.
   * Atualizada sempre que os dados forem modificados.
   */
  atualizadoEm?: Date;
}
