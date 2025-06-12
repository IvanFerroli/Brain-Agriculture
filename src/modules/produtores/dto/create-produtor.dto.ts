import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

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
   * CPF ou CNPJ do produtor.
   *
   * - Obrigatório
   * - Deve conter exatamente 11 (CPF) ou 14 (CNPJ) dígitos
   * - Aceita com ou sem pontuação (normalizado automaticamente)
   *
   * @example "123.456.789-00" ou "12.345.678/0001-99"
   */
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.replace(/\D/g, '')) // remove tudo que não for número
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'documento deve conter 11 (CPF) ou 14 (CNPJ) dígitos numéricos',
  })
  documento!: string;
}
