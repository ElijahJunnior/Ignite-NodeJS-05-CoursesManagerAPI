import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let repository: ICarsRepository;

describe("Create Car", () => {
  beforeEach(() => {
    repository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(repository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Nome do carro",
      description: "Descrição do Carro",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Nome do carro",
      description: "Descrição do Carro",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Nome do carro",
        description: "Descrição do Carro",
        daily_rate: 100,
        license_plate: "ABC-12345",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Nome do carro",
      description: "Descrição do Carro",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car.available).toBe(true);
  });
});
