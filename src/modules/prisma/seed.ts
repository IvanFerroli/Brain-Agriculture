import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Limpa as tabelas (ordem inversa dos relacionamentos)
  await prisma.cultura.deleteMany();
  await prisma.safra.deleteMany();
  await prisma.fazenda.deleteMany();
  await prisma.produtor.deleteMany();

  // PRODUTORES — 5 produtores diversificados
  const produtoresData = [
    { nome: 'José Silva', documento: '12345678901' },
    { nome: 'Maria Oliveira', documento: '23456789012' },
    { nome: 'Carlos Pereira', documento: '34567890123' },
    { nome: 'Ana Souza', documento: '45678901234' },
    { nome: 'Fernando Lima', documento: '56789012345' }
  ];
  for (const p of produtoresData) {
    await prisma.produtor.create({ data: p });
  }
  const produtores = await prisma.produtor.findMany();

  // SAFRAS — 4 safras de anos e períodos distintos
  const safrasData = [
    { nome: 'Safra Verão 2021/22', ano: 2022, inicio: new Date('2021-10-01'), fim: new Date('2022-04-30') },
    { nome: 'Safra Inverno 2022', ano: 2022, inicio: new Date('2022-05-10'), fim: new Date('2022-09-20') },
    { nome: 'Safra 2023', ano: 2023, inicio: new Date('2023-01-20'), fim: new Date('2023-11-25') },
    { nome: 'Safra 2024', ano: 2024, inicio: new Date('2024-03-15'), fim: new Date('2024-12-18') }
  ];
  for (const s of safrasData) {
    await prisma.safra.create({ data: s });
  }
  const safras = await prisma.safra.findMany();

  // FAZENDAS — 8 fazendas, áreas e cidades/estados variadas, associadas a diferentes produtores
  const fazendasData = [
    {
      nome: 'Fazenda Boa Vista', cidade: 'Campina Grande', estado: 'PB',
      areaTotal: 200, areaAgricultavel: 140, areaVegetacao: 60, produtorId: produtores[0].id
    },
    {
      nome: 'Sítio Esperança', cidade: 'Patos', estado: 'PB',
      areaTotal: 95, areaAgricultavel: 65, areaVegetacao: 30, produtorId: produtores[0].id
    },
    {
      nome: 'Chácara Luz', cidade: 'Juazeiro', estado: 'BA',
      areaTotal: 180, areaAgricultavel: 120, areaVegetacao: 60, produtorId: produtores[1].id
    },
    {
      nome: 'Fazenda Horizonte', cidade: 'Mossoró', estado: 'RN',
      areaTotal: 150, areaAgricultavel: 90, areaVegetacao: 60, produtorId: produtores[2].id
    },
    {
      nome: 'Estância Verde', cidade: 'Caruaru', estado: 'PE',
      areaTotal: 210, areaAgricultavel: 165, areaVegetacao: 45, produtorId: produtores[3].id
    },
    {
      nome: 'Sítio Paraíso', cidade: 'Garanhuns', estado: 'PE',
      areaTotal: 80, areaAgricultavel: 58, areaVegetacao: 22, produtorId: produtores[3].id
    },
    {
      nome: 'Fazenda Santa Clara', cidade: 'Uberaba', estado: 'MG',
      areaTotal: 300, areaAgricultavel: 220, areaVegetacao: 80, produtorId: produtores[4].id
    },
    {
      nome: 'Chácara Monte Azul', cidade: 'Londrina', estado: 'PR',
      areaTotal: 130, areaAgricultavel: 100, areaVegetacao: 30, produtorId: produtores[4].id
    }
  ];
  const fazendas = [];
  for (const f of fazendasData) {
    fazendas.push(await prisma.fazenda.create({ data: f }));
  }

  // CULTURAS — 16 culturas, variadas, combinando fazendas e safras diversas
  const culturasData = [
    // Fazenda 1
    { nome: 'Milho', fazendaId: fazendas[0].id, safraId: safras[0].id },
    { nome: 'Soja', fazendaId: fazendas[0].id, safraId: safras[2].id },
    // Fazenda 2
    { nome: 'Feijão', fazendaId: fazendas[1].id, safraId: safras[2].id },
    { nome: 'Girassol', fazendaId: fazendas[1].id, safraId: safras[1].id },
    // Fazenda 3
    { nome: 'Algodão', fazendaId: fazendas[2].id, safraId: safras[3].id },
    { nome: 'Arroz', fazendaId: fazendas[2].id, safraId: safras[0].id },
    // Fazenda 4
    { nome: 'Milho', fazendaId: fazendas[3].id, safraId: safras[0].id },
    { nome: 'Soja', fazendaId: fazendas[3].id, safraId: safras[1].id },
    // Fazenda 5
    { nome: 'Cana-de-açúcar', fazendaId: fazendas[4].id, safraId: safras[2].id },
    { nome: 'Café', fazendaId: fazendas[4].id, safraId: safras[3].id },
    // Fazenda 6
    { nome: 'Mandioca', fazendaId: fazendas[5].id, safraId: safras[3].id },
    { nome: 'Feijão', fazendaId: fazendas[5].id, safraId: safras[1].id },
    // Fazenda 7
    { nome: 'Soja', fazendaId: fazendas[6].id, safraId: safras[0].id },
    { nome: 'Algodão', fazendaId: fazendas[6].id, safraId: safras[2].id },
    // Fazenda 8
    { nome: 'Cevada', fazendaId: fazendas[7].id, safraId: safras[1].id },
    { nome: 'Trigo', fazendaId: fazendas[7].id, safraId: safras[3].id }
  ];
  for (const c of culturasData) {
    await prisma.cultura.create({ data: c });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
