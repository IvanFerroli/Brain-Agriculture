import { IsNotEmpty, IsString, Matches } from 'class-validator';

/**
 * Objeto de Transferência de Dados (DTO) para criação de um novo produtor.
 *
 * Este DTO é utilizado para validar e transportar os dados recebidos na requisição
 * ao endpoint de criação de produtores.
 */
export class CreateProdutorDto {
  /**
   * Nome completo do produtor.
   *
   * - Obrigatório
   * - Deve ser uma string
   */
  @IsNotEmpty()
  @IsString()
  nome!: string;

  /**
   * CPF ou CNPJ do produtor, somente com números.
   *
   * - Obrigatório
   * - Deve conter exatamente 11 (CPF) ou 14 (CNPJ) dígitos
   * - Não deve conter pontos, traços ou barras
   *
   * @example "12345678900" (CPF) ou "12345678000199" (CNPJ)
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos numéricos',
  })
  documento!: string;
}
