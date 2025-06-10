/**
 * Representa um produtor rural dentro do sistema.
 *
 * Essa classe é usada como referência de tipo em outras camadas da aplicação,
 * como services, controllers e DTOs.
 */
export class Produtor {
  /**
   * Identificador único do produtor (geralmente um UUID).
   * Pode ser gerado automaticamente pelo banco de dados ou via código.
   *
   * @example "f8d4b5a3-1234-4e9a-bb1e-abcde1234567"
   */
  id?: string;

  /**
   * Nome completo do produtor.
   *
   * @example "Maria Oliveira"
   */
  nome?: string;

  /**
   * Documento do produtor, que pode ser um CPF (11 dígitos) ou CNPJ (14 dígitos),
   * armazenado apenas com números, sem pontuação.
   *
   * @example "12345678900" (CPF) ou "12345678000199" (CNPJ)
   */
  documento?: string;

  /**
   * Data de criação do registro do produtor no sistema.
   * Preenchida automaticamente no momento da criação.
   */
  criadoEm?: Date;

  /**
   * Data da última atualização feita no registro do produtor.
   * Atualizada sempre que o produtor for modificado.
   */
  atualizadoEm?: Date;
}
