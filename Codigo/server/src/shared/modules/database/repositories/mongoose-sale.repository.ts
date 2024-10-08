import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaleRepository } from 'src/modules/sale/repositories/sale.repository';
import { Sale } from '../schemas/sale.schema';

@Injectable()
export class MongooseSaleRepository extends SaleRepository {
  constructor(@InjectModel(Sale.name) private readonly saleModel: Model<Sale>) {
    super();
  }

  async create(saleData: Partial<Sale>): Promise<Sale> {
    const sale = new this.saleModel(saleData);
    return sale.save();
  }
}
