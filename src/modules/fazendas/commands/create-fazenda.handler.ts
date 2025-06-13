import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFazendaCommand } from './create-fazenda.command';
import { FazendaService } from '../services/fazenda.service';
import { CreateFazendaDto } from '../dto/create-fazenda.dto';
import { Fazenda } from '../entities/fazenda.entity';

/**
 * @module Fazenda
 * @category Command Handler
 *
 * @description
 * Handler responsável por processar o comando de criação de uma nova fazenda.
 * Ele recebe os dados encapsulados no comando e delega a lógica de negócio ao `FazendaService`.
 */
@CommandHandler(CreateFazendaCommand)
export class CreateFazendaHandler implements ICommandHandler<CreateFazendaCommand> {
  constructor(private readonly fazendaService: FazendaService) {}

  /**
   * Executa o comando de criação da fazenda rural.
   *
   * Este método repassa os dados ao `FazendaService`, que aplica as regras de negócio
   * (como validação de soma de áreas e consistência de campos).
   *
   * @param command - Objeto `CreateFazendaCommand` contendo o DTO com os dados da fazenda.
   * @returns Fazenda criada
   *
   * @throws BadRequestException se os dados forem inválidos.
   * @throws ConflictException se houver conflito de dados (regra futura).
   */
  async execute(command: CreateFazendaCommand): Promise<Fazenda> {
    const dto: CreateFazendaDto = command.data;
    return this.fazendaService.create(dto);
  }
}
