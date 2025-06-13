import { CreateSafraHandler } from '../commands/create-safra.handler';
import { CreateSafraCommand } from '../commands/create-safra.command';
import { SafraService } from '../services/safra.service';
import { Safra } from '../entities/safra.entity';

/**
 * @module Safra
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `CreateSafraHandler`, responsável por receber comandos de
 * criação de safras e delegar ao `SafraService` a aplicação da lógica de negócio.
 *
 * Esta suíte valida:
 * - Que o comando é corretamente repassado ao service.
 * - Que o retorno do service é propagado.
 * - Que exceções do service são propagadas corretamente.
 *
 * O `SafraService` é mockado com jest para garantir isolamento.
 */
describe('CreateSafraHandler', () => {
  let handler: CreateSafraHandler;
  let service: jest.Mocked<SafraService>;

  beforeEach(() => {
    service = {
      create: jest.fn(),
    } as unknown as jest.Mocked<SafraService>;

    handler = new CreateSafraHandler(service);
  });

  it('deve criar uma safra com sucesso', async () => {
    const dto = {
      nome: 'Safra 2023/2024',
      culturaId: 'uuid-cultura',
      inicio: '2023-09-01',
      fim: '2024-04-30',
    };

    const safraCriada: Safra = {
      id: 'uuid-safra',
      nome: dto.nome,
      culturaId: dto.culturaId,
      inicio: new Date(dto.inicio),
      fim: new Date(dto.fim),
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };

    service.create.mockResolvedValue(safraCriada);


    const command = new CreateSafraCommand(dto);
    const result = await handler.execute(command);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(safraCriada);
  });

  it('deve propagar erro se cultura for inexistente', async () => {
    const dto = {
      nome: 'Safra 2023/2024',
      culturaId: 'invalida',
      inicio: '2023-09-01',
      fim: '2024-04-30',
    };

    const command = new CreateSafraCommand(dto);

    service.create.mockRejectedValue(new Error('Cultura não encontrada'));


    await expect(handler.execute(command)).rejects.toThrow('Cultura não encontrada');
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
