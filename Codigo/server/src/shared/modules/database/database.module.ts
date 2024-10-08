import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsRepository } from 'src/modules/products/repositories/products.repository';
import { MongooseProductsRepository } from './repositories/mongoos-product.repository';
import { CartRepository } from 'src/modules/carts/repositories/cart.repository';
import { MongooseCartRepository } from './repositories/mongoose-cart.repository';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { SaleRepository } from '../../../modules/sale/repositories/sale.repository';
import { MongooseSaleRepository } from './repositories/mongoose-sale.repository';
import { Sale, SaleSchema } from './schemas/sale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      {
        name: Cart.name,
        schema: CartSchema,
      },
      { name: Sale.name, schema: SaleSchema },
    ]),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `mongodb://${configService.get<string>('DBAAS_MONGO_HOST')}:${configService.get<string>('DBAAS_MONGO_PORT')}`,
          user: configService.get<string>('DBAAS_MONGO_USER'),
          pass: configService.get<string>('DBAAS_MONGO_PASS'),
          dbName: configService.get<string>('DBAAS_MONGO_DB_NAME'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: ProductsRepository,
      useClass: MongooseProductsRepository,
    },
    {
      provide: CartRepository,
      useClass: MongooseCartRepository,
    },
    {
      provide: SaleRepository,
      useClass: MongooseSaleRepository,
    },
  ],
  exports: [ProductsRepository, CartRepository, SaleRepository],
})
export class DatabaseModule {}
