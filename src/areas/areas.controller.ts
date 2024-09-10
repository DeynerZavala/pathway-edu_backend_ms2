import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AreasService } from './areas.service';
import { Area } from './area.entity';

@Controller('api/v2/areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  // CREATE a new area
  @Post()
  async create(@Body('areaName') areaName: string): Promise<Area> {
    return this.areasService.create(areaName);
  }

  // READ all areas
  @Get()
  async findAll(): Promise<Area[]> {
    return this.areasService.findAll();
  }

  // READ one area by id
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Area> {
    return this.areasService.findOne(id);
  }

  // UPDATE an area by id
  @Put(':id')
  async update(@Param('id') id: string, @Body('areaName') areaName: string): Promise<Area> {
    return this.areasService.update(id, areaName);
  }

  // DELETE an area by id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.areasService.remove(id);
  }
}
