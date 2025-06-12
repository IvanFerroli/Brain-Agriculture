import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSafraCommand } from './update-safra.command';
import { SafraService } from '../services/safra.service';

/**
 * @module Safra
 * @category Command Handler
 *
 * @description
 * Handler responsável por executar a atualização de uma safra.
 * Ele delega a lógica de negócio ao `SafraService`, que aplica
 * as validações necessárias.
 */
@CommandHandler(UpdateSafraCommand)
export class UpdateSafraHandler implements ICommandHandler<UpdateSafraCommand> {
  constructor(private readonly safraService: SafraService) {}

  /**
   * Executa o comando de atualização da safra.
   *
   * @param command - Objeto `UpdateSafraCommand` contendo o `id` da safra e os dados a atualizar.
   * @returns A safra atualizada, se os dados forem válidos.
   *
   * @throws NotFoundException se o ID não existir.
   * @throws BadRequestException se os dados forem inválidos.
   */
  async execute(command: UpdateSafraCommand): Promise<void> {
    const { id, data } = command;
    await this.safraService.update(id, data);
  }
}
