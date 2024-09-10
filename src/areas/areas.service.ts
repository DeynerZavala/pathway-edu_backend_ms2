import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areasRepository: Repository<Area>,
  ) {}

  // CREATE a new area
  async create(areaName: string): Promise<Area> {
    const area = this.areasRepository.create({ area_name: areaName });
    return this.areasRepository.save(area);
  }

  // READ all areas
  async findAll(): Promise<Area[]> {
    return this.areasRepository.find();
  }

  // READ a single area by id
  async findOne(areaId: string): Promise<Area> {
    return this.areasRepository.findOne({ where: { area_id: areaId } });
  }

  // UPDATE an area by id
  async update(areaId: string, areaName: string): Promise<Area> {
    const area = await this.findOne(areaId);
    if (area) {
      area.area_name = areaName;
      return this.areasRepository.save(area);
    }
    return null;
  }

  // DELETE an area by id
  async remove(areaId: string): Promise<void> {
    await this.areasRepository.delete(areaId);
  }
}
