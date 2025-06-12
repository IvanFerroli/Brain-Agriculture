import { IsNotEmpty, IsNumber, IsPositive, IsString, Validate } from 'class-validator';
import { SomaAreasValidator } from '../validators/soma-areas.validator';

/**
 * @module Fazenda
 * @category DTO
 *
 * @description
 * Objeto de Transferência de Dados (DTO) para criação de uma nova fazenda.
 *
 * Este DTO é utilizado para validar e transportar os dados recebidos na requisição
 * ao endpoint de criação de fazendas.
 *
 * Regras aplicadas:
 * - Todos os campos são obrigatórios
 * - Os valores numéricos devem ser positivos
 * - A soma das áreas agricultável e de vegetação não pode exceder a área total
 *
 * @see SomaAreasValidator
 */
export class CreateFazendaDto {
  /**
   * Nome da fazenda.
   */
  @IsString()
  @IsNotEmpty()
  nome!: string;

  /**
   * Área total da fazenda (em hectares).
   */
  @IsNumber()
  @IsPositive()
  areaTotal!: number;

  /**
   * Área agricultável da fazenda (em hectares).
   */
  @IsNumber()
  @IsPositive()
  areaAgricultavel!: number;

  /**
   * Área de vegetação da fazenda (em hectares).
   */
  @IsNumber()
  @IsPositive()
  areaVegetacao!: number;

  /**
   * ID do produtor associado a esta fazenda.
   */
  @IsString()
  @IsNotEmpty()
  produtorId!: string;

  /**
   * Campo auxiliar para ativar a validação de regra de negócio:
   * a soma de áreas não deve exceder a área total.
   */
  @Validate(SomaAreasValidator)
  validateSomaAreas?: this;
}
