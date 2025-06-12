/**
 * Query que representa a busca de uma safra específica por ID.
 */
export class FindSafraByIdQuery {
  constructor(public readonly id: string) {}
}
