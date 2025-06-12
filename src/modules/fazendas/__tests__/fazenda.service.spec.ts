import { FazendaService } from '../services/fazenda.service';
import { InMemoryFazendaRepository } from '../repositories/in-memory-fazenda.repository';
import { CreateFazendaDto } from '../dto/create-fazenda.dto';

/**
 * @module Fazenda
 * @category Service Tests
 *
 * @description
 * Testes unitários para o `FazendaService`, focando no comportamento do método `create()`
 * e suas implicações com o repositório in-memory.
 *
 * Essa suíte valida:
 * - Que a criação de fazendas ocorre sem erro com dados válidos.
 * - Que a exceção é lançada corretamente ao tentar deletar uma fazenda inexistente.
 */
describe('FazendaService - Método create()', () => {
  let service: FazendaService;

  beforeEach(() => {
    const repo = new InMemoryFazendaRepository();
    service = new FazendaService(repo);
  });

  it('deve criar uma fazenda com dados válidos', async () => {
    const dto: CreateFazendaDto = {
      nome: 'Fazenda Modelo',
      areaTotal: 100,
      areaAgricultavel: 60,
      areaVegetacao: 30,
      produtorId: 'produtor-123',
    };

    await expect(service.create(dto)).resolves.toBeUndefined();
  });

  it('deve lançar erro ao tentar deletar uma fazenda inexistente', async () => {
    await expect(service.delete('id-inexistente')).rejects.toThrow('Fazenda não encontrada');
  });
});
