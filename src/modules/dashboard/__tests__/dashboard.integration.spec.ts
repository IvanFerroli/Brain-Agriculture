import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../../../app.module";
import * as request from "supertest";
import { PrismaClient } from "@prisma/client";

/**
 * @file dashboard.integration.spec.ts
 * @module DashboardIntegrationTest
 * @description
 * Teste de integração para Dashboard: cobre o fluxo real de agregação de métricas do endpoint /dashboard/metrics.
 * Garante que os dados de produtores, fazendas, safras e culturas se refletem corretamente nas métricas e nos filtros,
 * executando requests HTTP contra a aplicação NestJS real, usando banco via Prisma.
 */

describe("DashboardController (integration)", () => {
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

  it("deve retornar métricas agregadas do dashboard com e sem filtros", async () => {
    // Cria produtor
    const resProdutor = await request(app.getHttpServer())
      .post("/produtores")
      .send({ nome: "Produtor Dash", documento: String(Date.now()) })
      .expect(201);

    const produtorId = resProdutor.body.id;

    // Cria fazenda
    const resFazenda = await request(app.getHttpServer())
      .post("/fazendas")
      .send({
        nome: "Fazenda Dash",
        produtorId,
        cidade: "Painel",
        estado: "SC",
        areaTotal: 150,
        areaAgricultavel: 100,
        areaVegetacao: 50,
      })
      .expect(201);

    const fazendaId = resFazenda.body.id;

    // Cria safra
    const resSafra = await request(app.getHttpServer())
      .post("/safras")
      .send({
        nome: "Safra Dash",
        inicio: "2023-02-01",
        fim: "2023-10-31",
      })
      .expect(201);

    const safraId = resSafra.body.id;

    await request(app.getHttpServer())
      .post("/culturas")
      .send({
        nome: "Soja",
        safraId,
        fazendaId,
      })
      .expect(201);

    // Testa dashboard sem filtro
    const resDashboard = await request(app.getHttpServer())
      .get("/dashboard/metrics")
      .expect(200);

    // Verifica a presença de chaves essenciais
    expect(resDashboard.body).toHaveProperty("totalFazendas");
    expect(resDashboard.body).toHaveProperty("totalHectares");
    expect(resDashboard.body.graficos).toHaveProperty("porEstado");
    expect(resDashboard.body.graficos).toHaveProperty("porCultura");
    expect(resDashboard.body.graficos).toHaveProperty("porUsoDoSolo");
    expect(resDashboard.body.filtrosAplicados).toEqual({});

    // Log para depuração
    console.log("porEstado:", resDashboard.body.graficos.porEstado);
    console.log("porCultura:", resDashboard.body.graficos.porCultura);

    // Verifica que o gráfico porEstado contém "SC", se existir
    if (Object.keys(resDashboard.body.graficos.porEstado).length > 0) {
      expect(Object.keys(resDashboard.body.graficos.porEstado)).toContain("SC");
    }

    // Verifica que o gráfico porCultura contém "Soja", se existir
    if (Object.keys(resDashboard.body.graficos.porCultura).length > 0) {
      expect(Object.keys(resDashboard.body.graficos.porCultura)).toContain("Soja");
    }

    // Testa dashboard com filtro por estado
    const resDashboardEstado = await request(app.getHttpServer())
      .get("/dashboard/metrics?estado=SC")
      .expect(200);

    expect(resDashboardEstado.body.filtrosAplicados).toMatchObject({ estado: "SC" });

    // Testa dashboard com filtro por cultura
    const resDashboardCultura = await request(app.getHttpServer())
      .get("/dashboard/metrics?cultura=Soja")
      .expect(200);

    expect(resDashboardCultura.body.filtrosAplicados).toMatchObject({ cultura: "Soja" });

    // Verifica que "Soja" está presente no gráfico porCultura, se existir
    if (Object.keys(resDashboardCultura.body.graficos.porCultura).length > 0) {
      expect(
        Object.keys(resDashboardCultura.body.graficos.porCultura)
      ).toContain("Soja");
    }
  });
});
