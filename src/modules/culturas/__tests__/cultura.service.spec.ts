import { CulturaService } from '../services/cultura.service';
import { InMemoryCulturaRepository } from '../repositories/in-memory-cultura.repository';
import { CreateCulturaDto } from '../dto/create-cultura.dto';

/**
 * @module Cultura
 * @category Service Tests
 *
 * @description
 * Testes unitários para o `CulturaService`, responsável pelas regras de negócio
 * associadas ao cadastro de culturas em uma determinada safra.
 *
 * Esta suíte valida o comportamento da função `create()`, garantindo:
 *
 * - Que uma cultura pode ser criada com sucesso se for única dentro da safra.
 * - Que nomes repetidos na mesma safra são rejeitados (mesmo com variações de caixa e espaços).
 * - Que culturas com o mesmo nome podem existir em safras diferentes.
 *
 * O repositório `InMemoryCulturaRepository` é usado como stub para manter isolamento
 * e previsibilidade durante os testes.
 */
describe('CulturaService - Método create()', () => {
  let service: CulturaService;

  beforeEach(() => {
    const repo = new InMemoryCulturaRepository();
    service = new CulturaService(repo);
  });

  it('deve criar uma cultura válida com nome único por safra', async () => {
    const dto: CreateCulturaDto = {
      nome: 'Soja',
      safraId: 'safra-2025',
      fazendaId: 'fazenda-1',
    };

    const result = await service.create(dto);

    expect(result).toHaveProperty('id');
    expect(result.nome).toBe('Soja');
    expect(result.safraId).toBe('safra-2025');
  });

  it('deve impedir cadastro de nome duplicado na mesma safra', async () => {
    await service.create({
      nome: 'Soja',
      safraId: 'safra-2025',
      fazendaId: 'fazenda-1',
    });

    await expect(
      service.create({
        nome: 'Soja',
        safraId: 'safra-2025',
        fazendaId: 'fazenda-1',
      }),
    ).rejects.toThrowError('Cultura já cadastrada para essa safra');
  });

  it('deve tratar variações de caixa e espaço como duplicação', async () => {
    await service.create({
      nome: '  milho  ',
      safraId: 'safra-2024',
      fazendaId: 'fazenda-1',
    });

    await expect(
      service.create({
        nome: 'MILHO',
        safraId: 'safra-2024',
        fazendaId: 'fazenda-1',
      }),
    ).rejects.toThrowError('Cultura já cadastrada para essa safra');
  });

  it('deve permitir mesmo nome em safras diferentes', async () => {
    await service.create({
      nome: 'Arroz',
      safraId: 'safra-2023',
      fazendaId: 'fazenda-1',
    });

    await expect(
      service.create({
        nome: 'Arroz',
        safraId: 'safra-2024',
        fazendaId: 'fazenda-1',
      }),
    ).resolves.not.toThrow();
  });
});
