import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProdutorCommand } from './delete-produtor.command';
import { ProdutorService } from '../services/produtor.service';

/**
 * Handler responsável por executar a exclusão de um produtor.
 */
@CommandHandler(DeleteProdutorCommand)
export class DeleteProdutorHandler implements ICommandHandler<DeleteProdutorCommand> {
  constructor(private readonly produtorService: ProdutorService) {}

  async execute(command: DeleteProdutorCommand): Promise<void> {
    return this.produtorService.delete(command.id);
  }
}
