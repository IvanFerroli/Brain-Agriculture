import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      message: 'Serasa Agro API is running',
      timestamp: new Date().toISOString(),
    };
  }
}
