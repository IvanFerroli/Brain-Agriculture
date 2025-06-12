import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProdutorCommand } from './create-produtor.command';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * @module Produtor
 * @category Command Handler
 *
 * @description
 * Handler responsável por tratar o comando de criação de produtor.
 * Ele recebe o comando com os dados e delega a lógica de negócio ao `ProdutorService`.
 */
@CommandHandler(CreateProdutorCommand)
export class CreateProdutorHandler implements ICommandHandler<CreateProdutorCommand> {
  constructor(private readonly produtorService: ProdutorService) {}

  /**
   * Executa o comando de criação de produtor rural.
   *
   * Este método delega ao `ProdutorService` a responsabilidade de aplicar
   * as regras de negócio (como validação de duplicidade e normalização do documento).
   *
   * @param command - Objeto `CreateProdutorCommand` contendo o DTO com os dados do produtor.
   * @returns O produtor criado, se o documento for único e os dados forem válidos.
   *
   * @throws ConflictException se o documento já estiver cadastrado.
   * @throws BadRequestException se os dados forem inválidos.
   */
  async execute(command: CreateProdutorCommand): Promise<Produtor> {
    return this.produtorService.create(command.dto);
  }
}
