import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import * as path from 'path';
import { RedisModule } from './shared/services/redis/redis.module';
import { ClerkAuthMiddleware } from './shared/middlewares/clerk-auth.middleware';
import { DatabaseModule } from './shared/modules/database/database.module';
import { CartModule } from './modules/carts/carts.module';
import { SeedModule } from './shared/modules/seed/seed.module';

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
    DatabaseModule,
    ProductsModule,
    CartModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClerkAuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
