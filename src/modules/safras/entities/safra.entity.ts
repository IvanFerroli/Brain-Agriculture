/**
 * Representa uma safra agrícola dentro do sistema.
 *
 * Essa classe é usada como referência de tipo em outras camadas da aplicação,
 * como services, controllers e DTOs.
 */
export class Safra {
  /**
   * Identificador único da safra (geralmente um UUID).
   * Pode ser gerado automaticamente pelo banco de dados ou via código.
   *
   * @example "a1b2c3d4-5678-9101-1121-314151617181"
   */
  id?: string;

  /**
   * Nome identificador da safra.
   *
   * @example "Safra 2023/2024"
   */
  nome?: string;

  /**
   * Data de início da safra.
   * Representa quando a safra foi oficialmente iniciada.
   */
  dataInicio?: Date;

  /**
   * Data de fim da safra.
   * Representa quando a safra foi oficialmente encerrada.
   */
  dataFim?: Date;

  /**
   * Data de criação do registro da safra no sistema.
   * Preenchida automaticamente no momento da criação.
   */
  criadoEm?: Date;

  /**
   * Data da última atualização feita no registro da safra.
   * Atualizada sempre que os dados forem modificados.
   */
  atualizadoEm?: Date;
}
