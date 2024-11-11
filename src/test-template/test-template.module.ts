import { Module } from '@nestjs/common';
import { TestTemplateService } from './test-template.service';
import { TestTemplateController } from './test-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestTemplate } from './test-template.enity';

@Module({
  imports: [TypeOrmModule.forFeature([TestTemplate])],
  providers: [TestTemplateService],
  controllers: [TestTemplateController]
})
export class TestTemplateModule {}
