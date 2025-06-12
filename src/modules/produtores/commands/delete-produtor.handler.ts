import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProdutorCommand } from './delete-produtor.command';
import { ProdutorService } from '../services/produtor.service';

/**
 * @module Produtor
 * @category Command Handler
 *
 * @description
 * Handler responsável por executar a exclusão de um produtor.
 * Ele delega a lógica de negócio ao `ProdutorService`, que realiza
 * a verificação de existência e exclusão do produtor.
 */
@CommandHandler(DeleteProdutorCommand)
export class DeleteProdutorHandler implements ICommandHandler<DeleteProdutorCommand> {
  constructor(private readonly produtorService: ProdutorService) {}

  /**
   * Executa o comando de exclusão de um produtor rural.
   *
   * @param command - Objeto `DeleteProdutorCommand` com o ID do produtor a ser excluído.
   * @returns Promise<void>
   *
   * @throws NotFoundException se o ID não corresponder a nenhum produtor existente.
   */
  async execute(command: DeleteProdutorCommand): Promise<void> {
    return this.produtorService.delete(command.id);
  }
}
