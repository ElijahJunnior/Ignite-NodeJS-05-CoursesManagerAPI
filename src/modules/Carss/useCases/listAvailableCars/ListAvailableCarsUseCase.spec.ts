import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

describe("List Cars", () => {
  let carsRepository: CarsRepositoryInMemory;
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car1 = await carsRepository.create({
      brand: "Car Brand",
      category_id: "12356",
      daily_rate: 200,
      description: "Car 01 description",
      fine_amount: 230,
      license_plate: "ELI-9999",
      name: "Car 01",
    });

    // const car2 = await carsRepository.create({
    //   brand: "RenaCar Brand",
    //   category_id: "category_id",
    //   daily_rate: 200,
    //   description: "Car 02 description",
    //   fine_amount: 230,
    //   license_plate: "ELI-9998",
    //   name: "Car 02",
    // });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car1 = await carsRepository.create({
      brand: "Car Brand",
      category_id: "123456",
      daily_rate: 200,
      description: "Car 01 description",
      fine_amount: 230,
      license_plate: "ELI-9999",
      name: "Car 01",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Car Brand" });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepository.create({
      brand: "Car Brand",
      category_id: "123456",
      daily_rate: 200,
      description: "Car 01 description",
      fine_amount: 230,
      license_plate: "ELI-9999",
      name: "Car 01",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car 01" });

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by category", async () => {
    const car1 = await carsRepository.create({
      brand: "Car Brand",
      category_id: "123456",
      daily_rate: 200,
      description: "Car 01 description",
      fine_amount: 230,
      license_plate: "ELI-9999",
      name: "Car 01",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1233456",
    });

    expect(cars).toEqual([car1]);
  });
});
