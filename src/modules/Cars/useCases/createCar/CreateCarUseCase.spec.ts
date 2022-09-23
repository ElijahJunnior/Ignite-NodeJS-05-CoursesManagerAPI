import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let repository: CategoriesRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    repository = new CategoriesRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(repository);
  });

  it("shold be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Nome do carro",
      description: "Descrição do Carro",
      daily_rate: 100,
      license_plate: "ABC-12345",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });
  });
});
