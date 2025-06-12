import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCulturaCommand } from './update-cultura.command';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Command Handler
 *
 * @description
 * Handler responsável por executar a atualização de uma cultura.
 * Ele delega ao `CulturaService` a lógica de negócio para persistência
 * dos dados atualizados.
 */
@CommandHandler(UpdateCulturaCommand)
export class UpdateCulturaHandler implements ICommandHandler<UpdateCulturaCommand> {
  constructor(private readonly culturaService: CulturaService) {}

  /**
   * Executa o comando de atualização.
   *
   * @param command Objeto contendo o ID da cultura e os dados a serem atualizados
   * @returns A cultura atualizada
   */
  async execute(command: UpdateCulturaCommand): Promise<Cultura> {
    return this.culturaService.update(command.id, command.data);
  }
}
