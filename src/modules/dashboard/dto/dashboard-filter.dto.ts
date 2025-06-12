import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

/**
 * Objeto de Transferência de Dados (DTO) utilizado para aplicar filtros
 * nas consultas de métricas do dashboard.
 *
 * Este DTO é passado via query string e permite restringir os resultados com base
 * em critérios como busca textual, estado, cultura e intervalo de área da fazenda.
 *
 * Exemplo de uso:
 * `/dashboard/metrics?search=João&estado=SP&cultura=Soja&areaMin=50&areaMax=200`
 */
export class DashboardFilterDto {
  /**
   * Texto de busca aplicado a nomes ou identificadores.
   *
   * - Opcional
   * - Deve ser uma string
   * - Pode representar nome de produtor, cultura etc.
   */
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Estado da fazenda (UF) — utilizado para filtros geográficos.
   *
   * - Opcional
   * - Deve ser uma string (ex: "SP", "MG")
   */
  @IsOptional()
  @IsString()
  estado?: string;

  /**
   * Cultura plantada (ex: Soja, Milho, Café).
   *
   * - Opcional
   * - Deve ser uma string
   */
  @IsOptional()
  @IsString()
  cultura?: string;

  /**
   * Valor mínimo da área total ou agricultável das fazendas consideradas.
   *
   * - Opcional
   * - Deve ser um número ≥ 0
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  areaMin?: number;

  /**
   * Valor máximo da área total ou agricultável das fazendas consideradas.
   *
   * - Opcional
   * - Deve ser um número ≥ 0
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  areaMax?: number;
}
