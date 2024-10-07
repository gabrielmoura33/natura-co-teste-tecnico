import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ProductsRepository } from '../repositories/products.repository';

@Processor('stock-update-queue')
export class StockUpdateProcessor extends WorkerHost {
  constructor(private readonly productsRepository: ProductsRepository) {
    super();
  }

  async process(job: Job<{ productId: string; stock: number }>): Promise<void> {
    const { productId, stock } = job.data;
    await this.productsRepository.update({ _id: productId }, { stock });
    console.log(`Updated stock for product ${productId} to ${stock}`);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data:`,
      job.data,
    );
  }
}
