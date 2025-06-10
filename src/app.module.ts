import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { HealthController } from './health/health.controller';
import { envSchema } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          console.error('❌ Erro na validação do .env:', parsed.error.flatten().fieldErrors);
          throw new Error('Variáveis de ambiente inválidas.');
        }
        return parsed.data;
      },
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
