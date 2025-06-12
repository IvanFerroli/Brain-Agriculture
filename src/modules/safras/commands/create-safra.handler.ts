import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSafraCommand } from './create-safra.command';
import { SafraService } from '../services/safra.service';
import { Safra } from '../entities/safra.entity';

/**
 * @module Safra
 * @category Command Handler
 *
 * @description
 * Handler responsável por tratar o comando de criação de safra.
 * Ele recebe o comando com os dados e delega a lógica de negócio ao `SafraService`.
 */
@CommandHandler(CreateSafraCommand)
export class CreateSafraHandler implements ICommandHandler<CreateSafraCommand> {
  constructor(private readonly safraService: SafraService) {}

  /**
   * Executa o comando de criação de uma nova safra.
   *
   * Este método delega ao `SafraService` a responsabilidade de aplicar
   * as regras de negócio (como validação de datas e cultura associada).
   *
   * @param command - Objeto `CreateSafraCommand` contendo o DTO com os dados da safra.
   * @returns A safra criada, se os dados forem válidos.
   *
   * @throws BadRequestException se os dados forem inválidos.
   * @throws NotFoundException se a cultura associada não existir.
   */
  async execute(command: CreateSafraCommand): Promise<Safra> {
    return this.safraService.create(command.dto);
  }
}
