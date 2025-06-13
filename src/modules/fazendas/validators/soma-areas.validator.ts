import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

/**
 * @module Fazenda
 * @category Validator
 *
 * @description
 * Validador customizado utilizado para verificar a consistência entre os campos
 * `areaTotal`, `areaAgricultavel` e `areaVegetacao` em um DTO de fazenda.
 *
 * Esta regra de negócio garante que a soma das áreas agricultável e de vegetação
 * não exceda a área total declarada da fazenda, assegurando dados coerentes
 * já no momento da validação do DTO.
 *
 * Regras aplicadas:
 * - Todos os campos devem ser números válidos (validação feita previamente no DTO)
 * - Soma: `areaAgricultavel + areaVegetacao <= areaTotal`
 *
 * Modo de uso:
 * Este validador é acionado via decorator `@Validate(SomaAreasValidator)` em uma
 * propriedade virtual (ex: `validateSomaAreas!: this`) do DTO de entrada.
 *
 * Exemplo no DTO:
 * ```ts
 * @Validate(SomaAreasValidator)
 * validateSomaAreas!: this;
 * ```
 *
 * Caso a regra seja violada, será lançada uma `BadRequestException` (via class-validator)
 * com a mensagem padronizada definida no método `defaultMessage()`.
 *
 * @see CreateFazendaDto
 */
@ValidatorConstraint({ name: "SomaAreasValidator", async: false })
export class SomaAreasValidator implements ValidatorConstraintInterface {
  /**
   * Valida a soma das áreas `areaAgricultavel` + `areaVegetacao` em relação à `areaTotal`.
   *
   * @param dto - Objeto de entrada contendo os campos necessários para validação
   * @returns `true` se a regra for satisfeita, `false` caso contrário
   */
  validate(dto: any): boolean {
    if (!dto) {
      return false;
    }

    const { areaTotal, areaAgricultavel, areaVegetacao } = dto;
    if (
      typeof areaTotal !== "number" ||
      typeof areaAgricultavel !== "number" ||
      typeof areaVegetacao !== "number"
    ) {
      return false;
    }

    return areaAgricultavel + areaVegetacao <= areaTotal;
  }

  /**
   * Mensagem de erro retornada quando a regra de soma é violada.
   *
   * @param args - Argumentos da validação (não utilizados aqui)
   * @returns Mensagem personalizada explicando a violação
   */
  defaultMessage(args: ValidationArguments): string {
    return "A soma das áreas agricultável e de vegetação excede a área total da fazenda";
  }
}
