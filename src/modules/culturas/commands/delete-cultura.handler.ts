import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCulturaCommand } from './delete-cultura.command';
import { CulturaService } from '../services/cultura.service';

/**
 * Handler responsável por executar a exclusão de uma cultura.
 */
@CommandHandler(DeleteCulturaCommand)
export class DeleteCulturaHandler implements ICommandHandler<DeleteCulturaCommand> {
  constructor(private readonly culturaService: CulturaService) {}

  async execute(command: DeleteCulturaCommand): Promise<void> {
    return this.culturaService.delete(command.id);
  }
}
