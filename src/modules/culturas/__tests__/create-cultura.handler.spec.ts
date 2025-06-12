import { CreateCulturaHandler } from '../commands/create-cultura.handler';
import { CreateCulturaCommand } from '../commands/create-cultura.command';
import { CulturaService } from '../services/cultura.service';
import { Cultura } from '../entities/cultura.entity';

/**
 * @module Cultura
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `CreateCulturaHandler`, responsável por receber comandos de
 * criação de culturas agrícolas e delegar ao `CulturaService` a aplicação da lógica de negócio.
 *
 * Esta suíte valida:
 * - Que o comando é corretamente repassado ao service.
 * - Que o retorno do service é propagado.
 * - Que exceções do service são propagadas corretamente.
 *
 * O `CulturaService` é mockado com jest para garantir isolamento.
 */
describe('CreateCulturaHandler', () => {
  let handler: CreateCulturaHandler;
  let service: { create: jest.Mock<Cultura, [any]> };

  beforeEach(() => {
    service = {
      create: jest.fn<Cultura, [any]>(),
    };

    handler = new CreateCulturaHandler(service as unknown as CulturaService);
  });

  it('deve criar uma cultura com sucesso', async () => {
    const dto = {
      nome: 'Soja',
      safraId: 'uuid-safra',
    };

    const culturaCriada: Cultura = {
      id: 'uuid-mockado',
      nome: dto.nome,
      safraId: dto.safraId,
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.create.mockReturnValue(culturaCriada);

    const command = new CreateCulturaCommand(dto);
    const result = await handler.execute(command);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(culturaCriada);
  });

  it('deve propagar erro se já existir cultura duplicada na safra', async () => {
    const dto = {
      nome: 'Milho',
      safraId: 'uuid-safra',
    };

    const command = new CreateCulturaCommand(dto);

    service.create.mockImplementation(() => {
      throw new Error('Cultura já cadastrada para esta safra');
    });

    await expect(handler.execute(command)).rejects.toThrow('Cultura já cadastrada para esta safra');
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
