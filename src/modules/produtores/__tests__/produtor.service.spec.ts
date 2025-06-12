import { ProdutorService } from '../services/produtor.service';
import { InMemoryProdutorRepository } from '../repositories/in-memory-produtor.repository';
import { CreateProdutorDto } from '../dto/create-produtor.dto';

/**
 * @module Produtor
 * @category Service Tests
 *
 * @description
 * Testes unitários para o `ProdutorService`, responsável pelas regras de negócio
 * relacionadas ao cadastro de produtores rurais.
 *
 * Esta suíte valida o comportamento da função `create()`, garantindo:
 *
 * - Que um produtor seja criado com sucesso se o documento for único.
 * - Que documentos duplicados (mesmo após normalização) sejam rejeitados.
 * - Que a normalização do documento (remoção de pontuação) funcione corretamente.
 *
 * O repositório in-memory (`InMemoryProdutorRepository`) é utilizado como stub,
 * mantendo o isolamento e controle total dos dados em cada teste.
 */
describe('ProdutorService - Método create()', () => {
  let service: ProdutorService;

  beforeEach(() => {
    const repo = new InMemoryProdutorRepository();
    service = new ProdutorService(repo);
  });

  it('deve criar um produtor com documento válido e único', () => {
    const dto: CreateProdutorDto = {
      nome: 'Maria Silva',
      documento: '123.456.789-00',
    };

    const result = service.create(dto);

    expect(result).toHaveProperty('id');
    expect(result.nome).toBe('Maria Silva');
    expect(result.documento).toBe('12345678900'); // normalizado
  });

  it('deve rejeitar criação se o documento já estiver cadastrado', () => {
    const dto: CreateProdutorDto = {
      nome: 'Carlos Souza',
      documento: '123.456.789-00',
    };

    service.create(dto); // primeiro cadastro

    expect(() => service.create(dto)).toThrowError('Documento já cadastrado');
  });

  it('deve rejeitar criação se o mesmo documento for inserido sem pontuação', () => {
    service.create({
      nome: 'João',
      documento: '123.456.789-00',
    });

    expect(() =>
      service.create({
        nome: 'João 2',
        documento: '12345678900',
      }),
    ).toThrowError('Documento já cadastrado');
  });
});
