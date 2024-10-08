import {
  Controller,
  Post,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FinalizeSaleUseCase } from './use-cases/finalize-sale.use-case.service';
import { ClerkAuthGuard } from 'src/shared/guards/clerk-auth.guard';
import { ClerkUser } from 'src/shared/decorators/clerk-user.decorator';

@Controller('sales')
@UseGuards(ClerkAuthGuard)
export class SaleController {
  constructor(private readonly finalizeSaleUseCase: FinalizeSaleUseCase) {}

  @Post('')
  async finalizeSale(@ClerkUser() user: { id: string }) {
    try {
      return await this.finalizeSaleUseCase.execute(user.id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Erro ao finalizar a venda');
    }
  }
}
