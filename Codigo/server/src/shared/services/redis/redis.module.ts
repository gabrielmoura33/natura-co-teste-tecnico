import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DBAAS_REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new Redis({
          host: configService.get<string>('DBAAS_REDIS_HOST'),
          port: configService.get<number>('DBAAS_REDIS_PORT'),
          // db: configService.get<number>('DBAAS_REDIS_DB'),
          password: configService.get<string>('DBAAS_REDIS_PASSWORD'),
          // tls: configService.get<string>('DBAAS_REDIS_TLS') ? {} : undefined,
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
