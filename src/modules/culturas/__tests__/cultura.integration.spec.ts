import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../app.module";
import * as request from "supertest";
import { PrismaClient } from "@prisma/client";

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
      .send({ nome: "Produtor Teste", documento: String(Date.now()) }) // documento único!
      .expect(201);

    const produtorId = resProdutor.body.id;

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

    // Lista todas
    const resAll = await request(app.getHttpServer())
      .get("/culturas")
      .expect(200);

    expect(Array.isArray(resAll.body)).toBe(true);
    expect(resAll.body.some((c: any) => c.id === id)).toBe(true);

    // Busca por ID
    const resOne = await request(app.getHttpServer())
      .get(`/culturas/${id}`)
      .expect(200);

    expect(resOne.body.nome).toBe("Cultura Integração");

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

    expect(resUpdated.body.nome).toBe("Cultura Atualizada");

    // Deleta cultura
    await request(app.getHttpServer()).delete(`/culturas/${id}`).expect(200);

    // Confirma exclusão
    await request(app.getHttpServer()).get(`/culturas/${id}`).expect(404);
  });
});
