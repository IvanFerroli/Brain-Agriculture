import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../app.module";
import * as request from "supertest";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

describe("FazendaController (integration)", () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeAll(async () => {
    // Executa o seed do banco antes de iniciar o app
    await execAsync("npx ts-node src/modules/prisma/seed.ts");

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

  it("deve criar, listar, atualizar, deletar e validar exclusão de uma fazenda (fluxo completo)", async () => {
    // Criar produtor para usar no relacionamento da fazenda
    const produtorDto = { nome: "Produtor Teste", documento: "12345678900" };
    const resProdutor = await request(app.getHttpServer())
      .post("/produtores")
      .send(produtorDto)
      .expect(201);

    const produtorId = resProdutor.body.id;

    // DTO da fazenda com produtorId válido
    const createDto = {
      nome: "Fazenda Integração",
      cidade: "Campina Grande",
      estado: "PB",
      areaTotal: 100,
      areaAgricultavel: 60,
      areaVegetacao: 40,
      produtorId, // usa ID criado dinamicamente
    };

    // Criar fazenda
    const resCreate = await request(app.getHttpServer())
      .post("/fazendas")
      .send(createDto)
      .expect(201);

    expect(resCreate.body).toHaveProperty("id");
    expect(resCreate.body.nome).toBe("Fazenda Integração");

    const id = resCreate.body.id;

    // Listar todas
    const resAll = await request(app.getHttpServer())
      .get("/fazendas")
      .expect(200);

    expect(Array.isArray(resAll.body)).toBe(true);
    expect(resAll.body.some((f: any) => f.id === id)).toBe(true);

    // Buscar por ID
    const resOne = await request(app.getHttpServer())
      .get(`/fazendas/${id}`)
      .expect(200);

    expect(resOne.body.nome).toBe("Fazenda Integração");

    // Atualizar fazenda
    const updateDto = {
      nome: "Fazenda Integração Atualizada",
      areaTotal: 120,
    };

    await request(app.getHttpServer())
      .put(`/fazendas/${id}`)
      .send(updateDto)
      .expect(200);

    // Validar atualização
    const resUpdated = await request(app.getHttpServer())
      .get(`/fazendas/${id}`)
      .expect(200);

    expect(resUpdated.body.nome).toBe("Fazenda Integração Atualizada");
    expect(resUpdated.body.areaTotal).toBe(120);

    // Deletar fazenda
    await request(app.getHttpServer()).delete(`/fazendas/${id}`).expect(200);

    // Confirmar exclusão
    await request(app.getHttpServer()).get(`/fazendas/${id}`).expect(404);
  });
});
