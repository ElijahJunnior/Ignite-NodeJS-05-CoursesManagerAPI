import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specification: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExistis = await this.carRepository.findById(car_id);

    if (!carExistis) {
      throw new AppError("Car does not exists!");
    }

    const specifications = await this.specification.findByIds(
      specifications_id
    );

    carExistis.specifications = specifications;

    await this.carRepository.create(carExistis);

    return carExistis;
  }
}

export { CreateCarSpecificationUseCase };
