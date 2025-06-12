import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSafraCommand } from './delete-safra.command';
import { SafraService } from '../services/safra.service';

/**
 * @module Safra
 * @category Command Handler
 *
 * @description
 * Handler responsável por executar a exclusão de uma safra.
 * Ele delega a lógica de negócio ao `SafraService`, que realiza
 * a verificação de existência e exclusão da safra.
 */
@CommandHandler(DeleteSafraCommand)
export class DeleteSafraHandler implements ICommandHandler<DeleteSafraCommand> {
  constructor(private readonly safraService: SafraService) {}

  /**
   * Executa o comando de exclusão de uma safra.
   *
   * @param command - Objeto `DeleteSafraCommand` com o ID da safra a ser excluída.
   * @returns Promise<void>
   *
   * @throws NotFoundException se o ID não corresponder a nenhuma safra existente.
   */
  async execute(command: DeleteSafraCommand): Promise<void> {
    return this.safraService.delete(command.id);
  }
}
