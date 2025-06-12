import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCulturaCommand } from './create-cultura.command';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Command Handler
 *
 * @description
 * Handler responsável por tratar o comando de criação de cultura.
 * Ele recebe o comando com os dados e delega a lógica de negócio ao `CulturaService`.
 */
@CommandHandler(CreateCulturaCommand)
export class CreateCulturaHandler implements ICommandHandler<CreateCulturaCommand> {
  constructor(private readonly culturaService: CulturaService) {}

  /**
   * Executa o comando de criação de cultura agrícola.
   *
   * @param command - Objeto `CreateCulturaCommand` contendo os dados da cultura a ser criada
   * @returns A cultura criada
   *
   * @throws ConflictException se já existir uma cultura semelhante na mesma safra
   */
  async execute(command: CreateCulturaCommand): Promise<Cultura> {
    return this.culturaService.create(command.dto);
  }
}
