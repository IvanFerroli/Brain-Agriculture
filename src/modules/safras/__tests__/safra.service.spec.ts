import { SafraService } from '../services/safra.service';
import { InMemorySafraRepository } from '../repositories/in-memory-safra.repository';
import { CreateSafraDto } from '../dto/create-safra.dto';

/**
 * @module Safra
 * @category Service Tests
 *
 * @description
 * Testes unitários para o `SafraService`, responsável pelas regras de negócio
 * relacionadas ao cadastro de safras agrícolas.
 *
 * Esta suíte valida o comportamento da função `create()`, garantindo:
 *
 * - Que uma safra seja criada com sucesso.
 * - Que os campos recebidos sejam corretamente armazenados.
 * - Que a estrutura esperada do retorno seja mantida.
 *
 * O repositório in-memory (`InMemorySafraRepository`) é utilizado como stub,
 * mantendo o isolamento e controle total dos dados em cada teste.
 */
describe('SafraService - Método create()', () => {
  let service: SafraService;

  beforeEach(() => {
    const repo = new InMemorySafraRepository();
    service = new SafraService(repo);
  });

  it('deve criar uma safra com dados válidos', async () => {
    const dto: CreateSafraDto = {
      nome: 'Safra 2023/2024',
      culturaId: 'uuid-cultura',
      inicio: '2023-09-01',
      fim: '2024-04-30',
    };

    const result = await service.create(dto);

    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(dto.nome);
    expect(result.culturaId).toBe(dto.culturaId);
    expect(result.inicio).toEqual(new Date(dto.inicio));
    expect(result.fim).toEqual(new Date(dto.fim));
  });

  it('deve armazenar a safra com campos obrigatórios preenchidos', async () => {
    const dto: CreateSafraDto = {
      nome: 'Safra Teste',
      culturaId: 'cultura-test',
      inicio: '2023-01-01',
      fim: '2023-06-01',
    };

    const safra = await service.create(dto);
    const todas = await service.findAll();

    expect(todas).toContainEqual(safra);
    expect(todas.length).toBe(1);
  });
});
