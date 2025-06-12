import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCulturaCommand } from './delete-cultura.command';
import { CulturaService } from '../services/cultura.service';

/**
 * @module Cultura
 * @category Command Handler
 *
 * @description
 * Handler responsável por executar a exclusão de uma cultura.
 * Ele delega a lógica de negócio ao `CulturaService`, que realiza
 * a verificação de existência e remoção da cultura.
 */
@CommandHandler(DeleteCulturaCommand)
export class DeleteCulturaHandler implements ICommandHandler<DeleteCulturaCommand> {
  constructor(private readonly culturaService: CulturaService) {}

  /**
   * Executa o comando de exclusão de uma cultura.
   *
   * @param command - Objeto `DeleteCulturaCommand` com o ID da cultura a ser excluída.
   * @returns Promise<void>
   *
   * @throws BadRequestException se o ID não corresponder a nenhuma cultura existente.
   */
  async execute(command: DeleteCulturaCommand): Promise<void> {
    return this.culturaService.delete(command.id);
  }
}
