import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFazendaCommand } from './create-fazenda.command';
import { FazendaService } from '../services/fazenda.service';

/**
 * Handler responsável por processar o comando de criação de uma fazenda.
 *
 * Utiliza o service para persistir os dados e encapsula a lógica no padrão CQRS.
 */
@CommandHandler(CreateFazendaCommand)
export class CreateFazendaHandler implements ICommandHandler<CreateFazendaCommand> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa o processo de criação da fazenda com base nos dados fornecidos.
   * @param command Contém os dados da nova fazenda.
   */
  async execute(command: CreateFazendaCommand): Promise<void> {
    await this.fazendaService.create(command.data);
  }
}
