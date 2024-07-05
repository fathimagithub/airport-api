import { Module } from '@nestjs/common';
import { AirportController } from './airport.controller';
import { ExcelService } from './excel.service';

@Module({
  imports: [],
  controllers: [AirportController],
  providers: [ExcelService],
})
export class AppModule {}