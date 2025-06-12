import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProdutorCommand } from './update-produtor.command';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * @module Produtor
 * @category Command Handler
 *
 * @description
 * Handler responsável por executar a atualização de um produtor.
 * Ele delega a lógica de negócio ao `ProdutorService`, que aplica
 * as validações necessárias, como verificação de duplicidade e dados obrigatórios.
 */
@CommandHandler(UpdateProdutorCommand)
export class UpdateProdutorHandler implements ICommandHandler<UpdateProdutorCommand> {
  constructor(private readonly produtorService: ProdutorService) {}

  /**
   * Executa o comando de atualização de produtor rural.
   *
   * @param command - Objeto `UpdateProdutorCommand` contendo o `id` do produtor e os dados a atualizar.
   * @returns O produtor atualizado, se os dados forem válidos.
   *
   * @throws NotFoundException se o ID não existir.
   * @throws ConflictException se o novo documento já estiver em uso.
   * @throws BadRequestException se os dados forem inválidos.
   */
  async execute(command: UpdateProdutorCommand): Promise<Produtor> {
    return this.produtorService.update(command.id, command.data);
  }
}
