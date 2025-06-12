import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

/**
 * Função principal de bootstrap da aplicação NestJS.
 *
 * Responsável por:
 * - Criar a aplicação usando o módulo raiz (`AppModule`)
 * - Utilizar o adaptador Fastify (mais performático que o Express)
 * - Iniciar o servidor escutando na porta 3000
 *
 * A função é assíncrona pois espera o processo de inicialização
 * e de binding da porta do servidor.
 */
async function bootstrap() {
  /**
   * Cria a aplicação NestJS usando o adaptador do Fastify.
   *
   * Fastify é uma alternativa ao Express com melhor performance,
   * e totalmente compatível com o ecossistema do NestJS.
   */
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  /**
   * Inicia o servidor HTTP escutando na porta 3000 e em todas as interfaces de rede (0.0.0.0),
   * permitindo que o app seja acessado de fora do container (por exemplo, via Docker ou Render).
   */
  await app.listen(3000, '0.0.0.0');

  // Confirmação visual de que o servidor foi iniciado com sucesso.
  console.log(`🚀 Server ready at http://localhost:3000`);
}

// Executa a função de inicialização da aplicação.
bootstrap();
