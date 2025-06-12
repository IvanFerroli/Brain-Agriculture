import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFazendaCommand } from './update-fazenda.command';
import { FazendaService } from '../services/fazenda.service';

/**
 * Handler responsável por executar a lógica do comando de atualização de uma fazenda.
 * 
 * Recebe um comando com os dados a serem atualizados e delega ao service.
 */
@CommandHandler(UpdateFazendaCommand)
export class UpdateFazendaHandler implements ICommandHandler<UpdateFazendaCommand> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa a atualização da fazenda com base nos dados do comando.
   * @param command Dados necessários para atualizar a fazenda.
   */
  async execute(command: UpdateFazendaCommand): Promise<void> {
    const { id, data } = command;
    await this.fazendaService.update(id, data);
  }
}
