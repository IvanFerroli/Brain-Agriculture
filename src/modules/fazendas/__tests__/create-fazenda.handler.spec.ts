import { CreateFazendaHandler } from '../commands/create-fazenda.handler';
import { CreateFazendaCommand } from '../commands/create-fazenda.command';
import { FazendaService } from '../services/fazenda.service';

/**
 * @module Fazenda
 * @category Handler Tests
 *
 * @description
 * Testes unitários para o `CreateFazendaHandler`, responsável por receber comandos de
 * criação de fazendas e delegar ao `FazendaService` a aplicação da lógica de negócio.
 *
 * Esta suíte valida:
 * - Que o comando é corretamente repassado ao service.
 * - Que erros lançados pelo service são propagados corretamente.
 *
 * O `FazendaService` é mockado com jest para garantir isolamento.
 */
describe('CreateFazendaHandler', () => {
  let handler: CreateFazendaHandler;
  let service: jest.Mocked<FazendaService>;

  beforeEach(() => {
    service = {
      create: jest.fn(),
    } as unknown as jest.Mocked<FazendaService>;

    handler = new CreateFazendaHandler(service);
  });

  it('deve criar uma fazenda com sucesso', async () => {
    const dto = {
      nome: 'Fazenda Verde',
      areaTotal: 100,
      areaAgricultavel: 60,
      areaVegetacao: 30,
      produtorId: 'produtor-uuid',
    };

    const command = new CreateFazendaCommand(dto);

    await handler.execute(command);

    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('deve propagar erro lançado pelo service', async () => {
    const dto = {
      nome: 'Fazenda Proibida',
      areaTotal: 50,
      areaAgricultavel: 40,
      areaVegetacao: 20,
      produtorId: 'produtor-x',
    };

    const command = new CreateFazendaCommand(dto);

    service.create.mockImplementation(() => {
      throw new Error('Soma das áreas excede a área total');
    });

    await expect(handler.execute(command)).rejects.toThrow('Soma das áreas excede a área total');
    expect(service.create).toHaveBeenCalledWith(dto);
  });
});
