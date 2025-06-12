import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCulturaCommand } from './update-cultura.command';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * Handler responsável por executar a atualização de uma cultura.
 */
@CommandHandler(UpdateCulturaCommand)
export class UpdateCulturaHandler implements ICommandHandler<UpdateCulturaCommand> {
  constructor(private readonly culturaService: CulturaService) {}

  async execute(command: UpdateCulturaCommand): Promise<Cultura> {
    return this.culturaService.update(command.id, command.data);
  }
}
