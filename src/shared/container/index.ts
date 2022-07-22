import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/Cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/Cars/repositories/implementations/CategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);
