import { IsNotEmpty, IsString, IsDateString } from "class-validator";

/**
 * Objeto de Transferência de Dados (DTO) para criação de uma nova safra.
 *
 * Este DTO é utilizado para validar e transportar os dados recebidos na requisição
 * ao endpoint de criação de safras.
 */
export class CreateSafraDto {
  /**
   * Nome da safra (ex: "Safra 2023/2024").
   *
   * - Obrigatório
   * - Deve ser uma string
   */
  @IsNotEmpty()
  @IsString()
  nome!: string;

  /**
   * ID da cultura associada à safra.
   *
   * - Obrigatório
   * - Deve ser uma string representando o UUID da cultura
   */
  @IsNotEmpty()
  @IsString()
  culturaId!: string;

  /**
   * Data de início da safra.
   *
   * - Obrigatório
   * - Deve estar em formato ISO 8601 (ex: "2023-09-01")
   */
  @IsNotEmpty()
  @IsDateString()
  inicio!: string;

  /**
   * Data de término da safra.
   *
   * - Obrigatório
   * - Deve estar em formato ISO 8601 (ex: "2024-04-30")
   */
  @IsNotEmpty()
  @IsDateString()
  fim!: string;
}
