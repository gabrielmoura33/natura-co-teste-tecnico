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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClerkAuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
