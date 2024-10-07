import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          connection: {
            host: configService.get<string>('DBAAS_REDIS_HOST'),
            port: +configService.get<number>('DBAAS_REDIS_PORT'),
            password: configService.get<string>('DBAAS_REDIS_PASSWORD'),
          },
        };
      },
    }),

    BullBoardModule.forRoot({
      route: '/admin/filas',
      adapter: ExpressAdapter,
    }),
  ],
  controllers: [],
})
export class JobsModule {}
