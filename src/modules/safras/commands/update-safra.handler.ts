import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSafraCommand } from './update-safra.command';
import { SafraService } from '../services/safra.service';

/**
 * Handler responsável por executar a lógica do comando de atualização de uma safra.
 * 
 * Recebe um comando com os dados a serem atualizados e delega ao service.
 */
@CommandHandler(UpdateSafraCommand)
export class UpdateSafraHandler implements ICommandHandler<UpdateSafraCommand> {
  constructor(private readonly safraService: SafraService) {}

  /**
   * Executa a atualização da safra com base nos dados do comando.
   * @param command Dados necessários para atualizar a safra.
   */
  async execute(command: UpdateSafraCommand): Promise<void> {
    const { id, data } = command;
    await this.safraService.update(id, data);
  }
}
