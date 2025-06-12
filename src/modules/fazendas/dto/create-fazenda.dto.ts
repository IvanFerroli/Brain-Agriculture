import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

/**
 * DTO responsável por validar os dados recebidos para criação de uma fazenda.
 */
export class CreateFazendaDto {
  /**
   * Nome da fazenda.
   */
  @IsString()
  @IsNotEmpty()
  nome: string;

  /**
   * Área total da fazenda (em hectares).
   */
  @IsNumber()
  @IsPositive()
  areaTotal: number;

  /**
   * Área agricultável da fazenda (em hectares).
   */
  @IsNumber()
  @IsPositive()
  areaAgricultavel: number;

  /**
   * Área de vegetação da fazenda (em hectares).
   */
  @IsNumber()
  @IsPositive()
  areaVegetacao: number;

  /**
   * ID do produtor associado a esta fazenda.
   */
  @IsString()
  @IsNotEmpty()
  produtorId: string;
}
