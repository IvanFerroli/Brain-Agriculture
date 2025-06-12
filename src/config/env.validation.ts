import { z } from 'zod';

/**
 * Esquema de validação das variáveis de ambiente da aplicação.
 *
 * Utiliza a biblioteca Zod para garantir que todas as variáveis necessárias
 * estejam presentes e com formato válido antes da aplicação iniciar.
 *
 * Caso alguma variável esteja ausente ou inválida, a aplicação irá falhar
 * logo no início com uma mensagem de erro clara.
 */
export const envSchema = z.object({
  /**
   * Ambiente atual da aplicação.
   *
   * Aceita apenas os valores:
   * - 'development' → ambiente local
   * - 'production' → ambiente de produção real
   * - 'test' → ambiente de testes (e2e ou unitários)
   *
   * Valor padrão: 'development'
   */
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  /**
   * URL de conexão com o banco de dados.
   *
   * Deve ser uma string no formato de URL válida.
   * Exemplo: postgres://usuario:senha@host:porta/nome_do_banco
   */
  DATABASE_URL: z.string().url({
    message: 'DATABASE_URL deve ser uma URL válida',
  }),

  /**
   * Porta onde o servidor vai rodar.
   *
   * Opcional. Se não for definida, o valor padrão será 3000.
   * Como o Zod não aceita `number()` diretamente de env string,
   * fazemos a conversão manual com `.transform(...)`.
   */
  PORT: z
    .string()
    .optional()
    .transform((val) => parseInt(val || '3000', 10)),
});

/**
 * Tipo inferido com base no schema acima, utilizado para tipar o objeto `process.env`.
 */
export type EnvVars = z.infer<typeof envSchema>;
