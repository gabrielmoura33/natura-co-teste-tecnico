import { Sale } from '../../..//shared/modules/database/schemas/sale.schema';

export abstract class SaleRepository {
  abstract create(saleData: Partial<Sale>): Promise<Sale>;
}
