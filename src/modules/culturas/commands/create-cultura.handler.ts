import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCulturaCommand } from './create-cultura.command';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * Handler responsável por tratar o comando de criação de cultura.
 *
 * Ele recebe o comando com os dados e delega a lógica de negócio ao `CulturaService`.
 */
@CommandHandler(CreateCulturaCommand)
export class CreateCulturaHandler implements ICommandHandler<CreateCulturaCommand> {
  constructor(private readonly culturaService: CulturaService) {}

  async execute(command: CreateCulturaCommand): Promise<Cultura> {
    return this.culturaService.create(command.dto);
  }
}
