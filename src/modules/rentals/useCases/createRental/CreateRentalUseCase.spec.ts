import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {
  const expected_return_date = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
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
        expected_return_date: dayjs().add(22, "hours").toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
