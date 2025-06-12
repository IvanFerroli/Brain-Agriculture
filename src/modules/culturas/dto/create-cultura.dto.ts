import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Objeto de Transferência de Dados (DTO) para criação de uma nova cultura.
 *
 * Este DTO é utilizado para validar e transportar os dados recebidos na requisição
 * ao endpoint de criação de culturas.
 */
export class CreateCulturaDto {
  /**
   * Nome da cultura plantada.
   *
   * - Obrigatório
   * - Deve ser uma string
   *
   * @example "Soja"
   */
  @IsNotEmpty()
  @IsString()
  nome!: string;

  /**
   * ID da safra associada à cultura.
   *
   * - Obrigatório
   * - Deve ser uma string representando o UUID da safra
   *
   * @example "a1b2c3d4-5678-9101-1121-314151617181"
   */
  @IsNotEmpty()
  @IsString()
  safraId!: string;
}
