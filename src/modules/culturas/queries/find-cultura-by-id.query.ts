/**
 * Query que representa a busca de uma cultura específica por ID.
 */
export class FindCulturaByIdQuery {
  constructor(public readonly id: string) {}
}
