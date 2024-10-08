import { Module } from '@nestjs/common';
import { FinalizeSaleUseCase } from './use-cases/finalize-sale.use-case.service';
import { DatabaseModule } from 'src/shared/modules/database/database.module';
import { SaleController } from './sale.controller';

@Module({
  imports: [DatabaseModule],
  providers: [FinalizeSaleUseCase],
  exports: [FinalizeSaleUseCase],
  controllers: [SaleController],
})
export class SaleModule {}
