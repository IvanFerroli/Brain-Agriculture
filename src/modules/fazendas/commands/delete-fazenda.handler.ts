import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFazendaCommand } from './delete-fazenda.command';
import { FazendaService } from '../services/fazenda.service';

/**
 * @module Fazenda
 * @category Command Handler
 *
 * @description
 * Handler responsável por executar a exclusão de uma fazenda rural.
 * Ele delega a lógica de negócio ao `FazendaService`, que realiza
 * a verificação de existência e remoção segura da fazenda.
 */
@CommandHandler(DeleteFazendaCommand)
export class DeleteFazendaHandler implements ICommandHandler<DeleteFazendaCommand> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa o comando de exclusão da fazenda com base no ID informado.
   *
   * @param command - Objeto `DeleteFazendaCommand` com o ID da fazenda a ser excluída.
   * @returns Promise<void>
   *
   * @throws NotFoundException se o ID não corresponder a nenhuma fazenda existente.
   */
  async execute(command: DeleteFazendaCommand): Promise<void> {
    await this.fazendaService.delete(command.id);
  }
}
