/**
 * Comando responsável por remover uma safra existente pelo ID.
 */
export class DeleteSafraCommand {
  constructor(public readonly id: string) {}
}
