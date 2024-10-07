import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SeedService } from './services/seed.service';

@Module({
  imports: [DatabaseModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
