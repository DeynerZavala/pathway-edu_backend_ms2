import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './area.entity';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreasService],
  controllers: [AreasController]
})
export class AreasModule {}
