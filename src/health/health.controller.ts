import { Controller, Get } from '@nestjs/common';

/**
 * Controller responsável por expor o endpoint de verificação de saúde da aplicação (healthcheck).
 *
 * Esse endpoint é utilizado para confirmar que a API está ativa e operando corretamente.
 * Pode ser utilizado por ferramentas de monitoramento ou orquestradores (ex: Render, Docker, K8s).
 */
@Controller()
export class HealthController {
  /**
   * Rota raiz da API (`GET /`) que retorna um JSON simples com informações básicas do status da aplicação.
   *
   * @returns Um objeto contendo:
   * - `status`: indica se o sistema está no ar
   * - `message`: mensagem informativa
   * - `timestamp`: data e hora da verificação (ISO)
   *
   * @example
   * {
   *   "status": "ok",
   *   "message": "Serasa Agro API is running",
   *   "timestamp": "2025-06-10T21:37:00.000Z"
   * }
   */
  @Get()
  getHealth() {
    return {
      status: 'ok',
      message: 'Serasa Agro API is running',
      timestamp: new Date().toISOString(),
    };
  }
}
