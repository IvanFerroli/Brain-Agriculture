import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSafraCommand } from './create-safra.command';
import { SafraService } from '../services/safra.service';
import { Safra } from '../entities/safra.entity';

/**
 * Handler responsável por tratar o comando de criação de safra.
 *
 * Ele recebe o comando com os dados e delega a lógica de negócio ao `SafraService`.
 */
@CommandHandler(CreateSafraCommand)
export class CreateSafraHandler implements ICommandHandler<CreateSafraCommand> {
  constructor(private readonly safraService: SafraService) {}

  async execute(command: CreateSafraCommand): Promise<Safra> {
    return this.safraService.create(command.dto);
  }
}
