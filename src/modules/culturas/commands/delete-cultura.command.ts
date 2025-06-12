/**
 * Comando responsável por remover uma cultura existente pelo ID.
 */
export class DeleteCulturaCommand {
  constructor(public readonly id: string) {}
}
