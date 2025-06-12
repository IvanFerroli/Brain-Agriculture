import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSafraCommand } from './delete-safra.command';
import { SafraService } from '../services/safra.service';

/**
 * Handler responsável por executar a exclusão de uma safra.
 */
@CommandHandler(DeleteSafraCommand)
export class DeleteSafraHandler implements ICommandHandler<DeleteSafraCommand> {
  constructor(private readonly safraService: SafraService) {}

  async execute(command: DeleteSafraCommand): Promise<void> {
    return this.safraService.delete(command.id);
  }
}
