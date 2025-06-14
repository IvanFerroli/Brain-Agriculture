import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../app.module";
import * as request from "supertest";
import { PrismaClient } from "@prisma/client";

/**
 * @file cultura.integration.spec.ts
 * @module CulturaIntegrationTest
 * @description
 * Teste de integração para Cultura: cobre o fluxo real de criação, listagem, consulta, atualização e deleção.
 * Executa requests HTTP contra a aplicação NestJS real, usando banco via Prisma.
 */


jest.setTimeout(20000); // Aumenta o timeout para testes mais longos

describe("CulturaController (integration)", () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    prisma = new PrismaClient();
  });

  beforeEach(async () => {
    await prisma.cultura.deleteMany();
    await prisma.safra.deleteMany();
    await prisma.fazenda.deleteMany();
    await prisma.produtor.deleteMany();
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it("deve criar, listar, atualizar, deletar e validar exclusão de uma cultura (fluxo completo)", async () => {
    // Cria produtor
    const resProdutor = await request(app.getHttpServer())
      .post("/produtores")
      .send({ nome: "Produtor Teste", documento: String(Date.now()) })
      .expect(201);

    const produtorId = resProdutor.body.id;
    console.log("Produtor criado:", resProdutor.body);

    // Cria fazenda
    const resFazenda = await request(app.getHttpServer())
      .post("/fazendas")
      .send({
        nome: "Fazenda Teste",
        produtorId,
        cidade: "Cidade Teste",
        estado: "PB",
        areaTotal: 100,
        areaAgricultavel: 60,
        areaVegetacao: 40,
      })
      .expect(201);

    const fazendaId = resFazenda.body.id;
    console.log("Fazenda criada:", resFazenda.body);

    // Cria safra
    const resSafra = await request(app.getHttpServer())
      .post("/safras")
      .send({
        nome: "Safra Teste",
        inicio: "2023-01-01",
        fim: "2023-12-31",
      })
      .expect(201);

    const safraId = resSafra.body.id;
    console.log("Safra criada:", resSafra.body);

    // Cria cultura
    const createDto = {
      nome: "Cultura Integração",
      safraId,
      fazendaId,
    };
    const resCreate = await request(app.getHttpServer())
      .post("/culturas")
      .send(createDto)
      .expect(201);

    expect(resCreate.body).toHaveProperty("id");
    expect(resCreate.body.nome).toBe("Cultura Integração");

    const id = resCreate.body.id;
    console.log("Cultura criada:", resCreate.body);

    // Lista todas
    const resAll = await request(app.getHttpServer())
      .get("/culturas")
      .expect(200);

    expect(Array.isArray(resAll.body)).toBe(true);
    const found = resAll.body.find(
      (c: any) =>
        c.id === id &&
        c.nome === createDto.nome &&
        c.safraId === safraId &&
        c.fazendaId === fazendaId,
    );
    if (!found) {
      // Debug extra: dumpa o array em caso de falha
      console.error("Culturas encontradas:", resAll.body);
    }
    expect(found).toBeDefined();
    expect(found.nome).toBe(createDto.nome);
    expect(found.safraId).toBe(safraId);
    expect(found.fazendaId).toBe(fazendaId);

    // Busca por ID
    const resOne = await request(app.getHttpServer())
      .get(`/culturas/${id}`)
      .expect(200);

    expect(resOne.body).toHaveProperty("id", id);
    expect(resOne.body).toHaveProperty("nome", "Cultura Integração");

    // Atualiza cultura
    const updateDto = {
      nome: "Cultura Atualizada",
    };

    await request(app.getHttpServer())
      .put(`/culturas/${id}`)
      .send(updateDto)
      .expect(200);

    // Valida atualização
    const resUpdated = await request(app.getHttpServer())
      .get(`/culturas/${id}`)
      .expect(200);

    expect(resUpdated.body).toHaveProperty("id", id);
    expect(resUpdated.body).toHaveProperty("nome", "Cultura Atualizada");

    // Deleta cultura
    await request(app.getHttpServer()).delete(`/culturas/${id}`).expect(200);

    // Confirma exclusão
    await request(app.getHttpServer()).get(`/culturas/${id}`).expect(404);
  });
});
