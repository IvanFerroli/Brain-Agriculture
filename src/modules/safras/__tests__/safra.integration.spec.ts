import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../app.module";
import * as request from "supertest";
import { PrismaClient } from "@prisma/client";

/**
 * @file safra.integration.spec.ts
 * @module SafraIntegrationTest
 * @description
 * Teste de integração para Safra: cobre o fluxo REST real de criação, listagem, consulta e deleção.
 * Executa requests HTTP contra a aplicação NestJS real, usando banco via Prisma.
 */

describe("SafraController (integration)", () => {
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
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it("deve criar, listar e deletar uma safra (fluxo completo)", async () => {
    const createDto = {
      nome: "Safra Integração",
      inicio: "2023-01-01",
      fim: "2023-12-31",
    };
    const resCreate = await request(app.getHttpServer())
      .post("/safras")
      .send(createDto)
      .expect(201);

    expect(resCreate.body).toHaveProperty("id");
    expect(resCreate.body.nome).toBe("Safra Integração");

    const id = resCreate.body.id;

    const resAll = await request(app.getHttpServer())
      .get("/safras")
      .expect(200);

    expect(Array.isArray(resAll.body)).toBe(true);
    const found = resAll.body.find(
      (s: any) => s.id === id && s.nome === createDto.nome,
    );

    expect(found).toBeDefined();
    expect(found.nome).toBe(createDto.nome);

    const resOne = await request(app.getHttpServer())
      .get(`/safras/${id}`)
      .expect(200);

    expect(resOne.body.nome).toBe("Safra Integração");

    // Deletar safra
    await request(app.getHttpServer()).delete(`/safras/${id}`).expect(200);  // Pode ser 204 ou 200

    // Confirmar exclusão
    await request(app.getHttpServer()).get(`/safras/${id}`).expect(404);  // Espera 404 após exclusão
  });
});
