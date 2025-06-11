import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProdutorCommand } from './update-produtor.command';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * Handler responsável por executar a atualização de um produtor.
 */
@CommandHandler(UpdateProdutorCommand)
export class UpdateProdutorHandler implements ICommandHandler<UpdateProdutorCommand> {
  constructor(private readonly produtorService: ProdutorService) {}

  async execute(command: UpdateProdutorCommand): Promise<Produtor> {
    return this.produtorService.update(command.id, command.data);
  }
}
