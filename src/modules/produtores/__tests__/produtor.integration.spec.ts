import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../app.module";
import * as request from "supertest";
import { PrismaClient } from "@prisma/client";

/**
 * @file produtor.integration.spec.ts
 * @module ProdutorIntegrationTest
 * @description
 * Teste de integração para Produtor: cobre o fluxo REST real de criação, listagem, consulta e deleção.
 * Executa requests HTTP contra a aplicação NestJS real, usando banco via Prisma.
 */

describe("ProdutorController (integration)", () => {
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

  it("deve criar, listar e deletar um produtor (fluxo completo)", async () => {
    const createDto = { nome: "Produtor Integração", documento: "99999999999" };
    const resCreate = await request(app.getHttpServer())
      .post("/produtores")
      .send(createDto)
      .expect(201);

    expect(resCreate.body).toHaveProperty("id");
    expect(resCreate.body.nome).toBe("Produtor Integração");

    const id = resCreate.body.id;

    const resAll = await request(app.getHttpServer())
      .get("/produtores")
      .expect(200);

    expect(Array.isArray(resAll.body)).toBe(true);

    // Busca o produtor criado pelo ID e valida todos os campos esperados
    const found = resAll.body.find(
      (p: any) =>
        p.id === id &&
        p.nome === createDto.nome &&
        p.documento === createDto.documento,
    );

    expect(found).toBeDefined();
    expect(found.nome).toBe(createDto.nome);
    expect(found.documento).toBe(createDto.documento);

    const resOne = await request(app.getHttpServer())
      .get(`/produtores/${id}`)
      .expect(200);

    expect(resOne.body.nome).toBe("Produtor Integração");

    // Deletar produtor
    await request(app.getHttpServer()).delete(`/produtores/${id}`).expect(200); // Pode ser 200 ou 204

    // Confirmar exclusão
    await request(app.getHttpServer()).get(`/produtores/${id}`).expect(404); // Espera 404 após a exclusão
  });
});
