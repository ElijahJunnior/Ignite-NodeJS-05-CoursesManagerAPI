import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDataProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: IRentalsRepository;
let carsRepository: ICarsRepository;
let dateProvider: IDateProvider;
let createRentalUseCase: CreateRentalUseCase;
let expected_return_date: Date;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider
    );
    expected_return_date = dateProvider.dateNowWithAdd(1, "day");
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "123456",
      user_id: "12344321",
      expected_return_date,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a rental for a user who already has one open", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "000001",
        user_id: "000001",
        expected_return_date,
      });

      await createRentalUseCase.execute({
        car_id: "000002",
        user_id: "000001",
        expected_return_date,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental for a car who already has one open", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "000001",
        user_id: "000001",
        expected_return_date,
      });

      await createRentalUseCase.execute({
        car_id: "000001",
        user_id: "000002",
        expected_return_date,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a rental with invalid return date", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "000001",
        user_id: "000001",
        expected_return_date: dateProvider.dateNowWithAdd(22, "hour"),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
