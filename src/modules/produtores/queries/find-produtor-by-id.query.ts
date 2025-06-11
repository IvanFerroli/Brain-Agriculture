/**
 * Query que representa a busca de um produtor específico por ID.
 */
export class FindProdutorByIdQuery {
  constructor(public readonly id: string) {}
}
