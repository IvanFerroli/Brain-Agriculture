import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProdutorCommand } from './create-produtor.command';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * Handler responsável por tratar o comando de criação de produtor.
 *
 * Ele recebe o comando com os dados e delega a lógica de negócio ao `ProdutorService`.
 */
@CommandHandler(CreateProdutorCommand)
export class CreateProdutorHandler implements ICommandHandler<CreateProdutorCommand> {
  constructor(private readonly produtorService: ProdutorService) {}

  async execute(command: CreateProdutorCommand): Promise<Produtor> {
    return this.produtorService.create(command.dto);
  }
}
