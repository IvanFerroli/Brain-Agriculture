import { UpdateProdutorHandler } from '../commands/update-produtor.handler';
import { UpdateProdutorCommand } from '../commands/update-produtor.command';
import { ProdutorService } from '../services/produtor.service';
import { Produtor } from '../entities/produtor.entity';

/**
 * @module Produtor
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `UpdateProdutorHandler`, responsável por tratar o comando
 * de atualização de produtores rurais.
 *
 * Esta suíte valida:
 * - Que o comando delega corretamente para o `ProdutorService`.
 * - Que erros como ID inexistente ou documento duplicado são propagados.
 *
 * O service é mockado para garantir isolamento e prever cenários de sucesso e falha.
 */
describe('UpdateProdutorHandler', () => {
  let handler: UpdateProdutorHandler;
  let service: jest.Mocked<ProdutorService>;

  beforeEach(() => {
    service = {
      update: jest.fn(),
    } as unknown as jest.Mocked<ProdutorService>;

    handler = new UpdateProdutorHandler(service);
  });

  it('deve atualizar um produtor com dados válidos', async () => {
    const id = 'uuid-produtor';
    const data = { nome: 'Novo Nome' };

    const produtorAtualizado: Produtor = {
      id,
      nome: data.nome,
      documento: '12345678900',
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.update.mockResolvedValue(produtorAtualizado);

    const command = new UpdateProdutorCommand(id, data);
    const result = await handler.execute(command);

    expect(service.update).toHaveBeenCalledWith(id, data);
    expect(result).toEqual(produtorAtualizado);
  });

  it('deve lançar erro se o ID não existir', async () => {
    const id = 'inexistente';
    const data = { nome: 'Qualquer' };

    service.update.mockImplementation(() => {
      throw new Error('Produtor não encontrado');
    });

    const command = new UpdateProdutorCommand(id, data);

    await expect(handler.execute(command)).rejects.toThrow('Produtor não encontrado');
    expect(service.update).toHaveBeenCalledWith(id, data);
  });

  it('deve lançar erro se o novo documento já estiver em uso', async () => {
    const id = 'uuid-produtor';
    const data = { documento: '12345678900' };

    service.update.mockImplementation(() => {
      throw new Error('Documento já cadastrado');
    });

    const command = new UpdateProdutorCommand(id, data);

    await expect(handler.execute(command)).rejects.toThrow('Documento já cadastrado');
    expect(service.update).toHaveBeenCalledWith(id, data);
  });
});
