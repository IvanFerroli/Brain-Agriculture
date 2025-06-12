import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFazendaCommand } from './update-fazenda.command';
import { FazendaService } from '../services/fazenda.service';

/**
 * @module Fazenda
 * @category Command Handler
 *
 * @description
 * Handler responsável por executar o comando de atualização de uma fazenda rural.
 * Recebe o comando com o ID da fazenda e os dados parciais a serem atualizados,
 * delegando a lógica ao `FazendaService`.
 */
@CommandHandler(UpdateFazendaCommand)
export class UpdateFazendaHandler implements ICommandHandler<UpdateFazendaCommand> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa a atualização da fazenda com base nos dados fornecidos.
   *
   * @param command - Objeto `UpdateFazendaCommand` contendo ID e campos a atualizar.
   * @returns `void` em caso de sucesso.
   *
   * @throws NotFoundException se o ID não existir.
   * @throws BadRequestException se os dados forem inválidos.
   */
  async execute(command: UpdateFazendaCommand): Promise<void> {
    const { id, data } = command;
    await this.fazendaService.update(id, data);
  }
}
