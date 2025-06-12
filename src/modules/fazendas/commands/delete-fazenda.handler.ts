import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFazendaCommand } from './delete-fazenda.command';
import { FazendaService } from '../services/fazenda.service';

/**
 * Handler responsável por executar a lógica de exclusão de uma fazenda.
 *
 * Recebe um comando com o ID da fazenda e delega ao service responsável.
 */
@CommandHandler(DeleteFazendaCommand)
export class DeleteFazendaHandler implements ICommandHandler<DeleteFazendaCommand> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa a exclusão da fazenda com o ID informado.
   * @param command Comando contendo o ID da fazenda a ser removida.
   */
  async execute(command: DeleteFazendaCommand): Promise<void> {
    const { id } = command;
    await this.fazendaService.delete(id);
  }
}
