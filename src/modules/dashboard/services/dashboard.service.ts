import { Injectable } from '@nestjs/common';
import { DashboardFilterDto } from '../dto/dashboard-filter.dto';

/**
 * Serviço responsável por calcular e retornar as métricas do dashboard.
 *
 * Esta classe atua como a orquestradora das consultas agregadas, utilizando os filtros
 * recebidos para personalizar os dados retornados.
 *
 * No futuro, este serviço deve integrar com os serviços de `Produtor`, `Fazenda`, `Safra` e `Cultura`
 * para obter as contagens reais e aplicar filtros complexos.
 */
@Injectable()
export class DashboardService {
  /**
   * Mock interno de dados de fazendas com culturas.
   * No futuro, deve ser substituído por agregações reais.
   */
  protected fazendas = [
    {
      id: '1',
      nome: 'Fazenda SP',
      estado: 'SP',
      areaTotal: 300,
      areaAgricultavel: 200,
      areaVegetacao: 100,
      culturas: ['Soja', 'Milho'],
    },
    {
      id: '2',
      nome: 'Fazenda MG',
      estado: 'MG',
      areaTotal: 500,
      areaAgricultavel: 300,
      areaVegetacao: 200,
      culturas: ['Café'],
    },
    {
      id: '3',
      nome: 'Fazenda SP 2',
      estado: 'SP',
      areaTotal: 100,
      areaAgricultavel: 80,
      areaVegetacao: 20,
      culturas: ['Soja'],
    },
  ];

  /**
   * Retorna as métricas agregadas com base nos filtros recebidos.
   *
   * @param filters - Objeto contendo critérios opcionais para refinar os dados do dashboard
   * @returns Um objeto com as métricas do sistema e os filtros aplicados
   */
  async getMetrics(filters: DashboardFilterDto): Promise<any> {
    const { estado, cultura, areaMin, areaMax, search } = filters;

    let filtered = [...this.fazendas];

    if (estado) {
      filtered = filtered.filter(f => f.estado === estado);
    }

    if (cultura) {
      filtered = filtered.filter(f => f.culturas.includes(cultura));
    }

    if (areaMin !== undefined) {
      filtered = filtered.filter(f => f.areaTotal >= areaMin);
    }

    if (areaMax !== undefined) {
      filtered = filtered.filter(f => f.areaTotal <= areaMax);
    }

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        f =>
          f.nome.toLowerCase().includes(s) ||
          f.culturas.some(c => c.toLowerCase().includes(s))
      );
    }

    const totalFazendas = filtered.length;
    const totalHectares = filtered.reduce((acc, f) => acc + f.areaTotal, 0);

    const graficos = {
      porEstado: this.countBy(filtered, 'estado'),
      porCultura: this.countCulturas(filtered),
      porUsoDoSolo: {
        agricultavel: filtered.reduce((acc, f) => acc + f.areaAgricultavel, 0),
        vegetacao: filtered.reduce((acc, f) => acc + f.areaVegetacao, 0),
      },
    };

    return {
      totalFazendas,
      totalHectares,
      graficos,
      filtrosAplicados: filters,
    };
  }

  /**
   * Conta ocorrências agrupadas por um campo string.
   */
  private countBy(data: any[], key: string): Record<string, number> {
    return data.reduce((acc, item) => {
      const k = item[key];
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Conta quantas vezes cada cultura aparece nas fazendas filtradas.
   */
  private countCulturas(data: any[]): Record<string, number> {
    const contagem: Record<string, number> = {};
    for (const fazenda of data) {
      for (const cultura of fazenda.culturas) {
        contagem[cultura] = (contagem[cultura] || 0) + 1;
      }
    }
    return contagem;
  }
}
