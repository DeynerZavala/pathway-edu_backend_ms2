import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Area } from './area.entity';
import { AreasService } from './areas.service';

@Controller()
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  // CREATE
  @MessagePattern({ cmd: 'create_area' })
  async create(areaData: { areaName: string }): Promise<Area> {
    return this.areasService.create(areaData.areaName);
  }

  // READ all
  @MessagePattern({ cmd: 'get_all_areas' })
  async findAll(): Promise<Area[]> {
    return this.areasService.findAll();
  }

  // READ one
  @MessagePattern({ cmd: 'get_area_by_id' })
  async findOne(id: string): Promise<Area> {
    return this.areasService.findOne(id);
  }

  // UPDATE
  @MessagePattern({ cmd: 'update_area' })
  async update(data: { id: string; areaName: string }): Promise<Area> {
    const { id, areaName } = data;
    return this.areasService.update(id, areaName);
  }

  // DELETE
  @MessagePattern({ cmd: 'delete_area' })
  async remove(id: string): Promise<void> {
    return this.areasService.remove(id);
  }
}
