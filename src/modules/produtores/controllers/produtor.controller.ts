import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateProdutorDto } from "../dto/create-produtor.dto";
import { ProdutorService } from "../services/produtor.service";
import { Produtor } from "../entities/produtor.entity";

/**
 * Controlador responsável por lidar com as requisições relacionadas aos produtores.
 *
 * Todas as rotas deste controlador serão prefixadas por `/produtores`.
 * Por exemplo:
 * - POST `/produtores` → Cria um novo produtor
 * - GET `/produtores` → Lista todos os produtores
 * - GET `/produtores/:id` → Retorna um produtor específico pelo ID
 */
@Controller("produtores")
export class ProdutorController {
  /**
   * Injeta o serviço de produtores para lidar com a lógica de negócio.
   * 
   * @param produtorService Serviço responsável pelas operações com produtores
   */
  constructor(private readonly produtorService: ProdutorService) {}

  /**
   * Rota para criar um novo produtor.
   *
   * Esta rota espera um corpo (body) com os campos `nome` e `documento` (CPF/CNPJ),
   * validados pelo DTO `CreateProdutorDto`.
   *
   * @param dto Dados do produtor a ser criado
   * @returns O produtor recém-criado
   *
   * @example
   * POST /produtores
   * {
   *   "nome": "João da Silva",
   *   "documento": "12345678900"
   * }
   */
  @Post()
  async create(@Body() dto: CreateProdutorDto): Promise<Produtor> {
    return this.produtorService.create(dto);
  }

  /**
   * Rota para buscar todos os produtores cadastrados.
   *
   * Nenhum parâmetro é necessário.
   *
   * @returns Lista de todos os produtores registrados
   *
   * @example
   * GET /produtores
   */
  @Get()
  async findAll(): Promise<Produtor[]> {
    return this.produtorService.findAll();
  }

  /**
   * Rota para buscar um produtor específico pelo seu ID.
   *
   * @param id O identificador único (UUID) do produtor
   * @returns O produtor correspondente ao ID, ou `undefined` se não encontrado
   *
   * @example
   * GET /produtores/7f34c24d-8d91-45c5-a23c-e2e456b973f9
   */
  @Get(":id")
  async findById(@Param("id") id: string): Promise<Produtor | undefined> {
    return this.produtorService.findById(id);
  }
}
