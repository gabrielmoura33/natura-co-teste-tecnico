import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import * as path from 'path';
import { RedisModule } from './shared/services/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(
          'src',
          'env',
          `${process.env.NODE_ENV || 'development'}.env`,
        ),
      ],
      isGlobal: true,
    }),
    ProductsModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
