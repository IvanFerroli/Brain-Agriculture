/**
 * Comando responsável por remover um produtor existente pelo ID.
 */
export class DeleteProdutorCommand {
  constructor(public readonly id: string) {}
}
