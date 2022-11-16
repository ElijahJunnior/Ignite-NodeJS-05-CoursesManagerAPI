import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const spec = new Specification();

    Object.assign(spec, {
      name,
      description,
    });

    this.specifications.push(spec);

    return spec;
  }

  async findByName(name: string): Promise<Specification> {
    const spec = this.specifications.find((spec) => spec.name === name);

    return spec;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specs = this.specifications.filter((spec) => ids.includes(spec.id));

    return specs;
  }
}

export { SpecificationsRepositoryInMemory };
