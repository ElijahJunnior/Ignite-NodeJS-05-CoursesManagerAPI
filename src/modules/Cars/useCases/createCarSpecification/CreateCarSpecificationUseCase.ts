import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(private carRepository: ICarsRepository) {}

  async execute({ car_id, specifications_id }: IRequest) {
    const carExistis = await this.carRepository.findById(car_id);

    if (!carExistis) {
      throw new AppError("Car does not exists!");
    }
  }
}

export { CreateCarSpecificationUseCase };
