import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/Cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/Cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/Cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/Cars/repositories/ISpecificationsRepository";

// insere no container uma injeção singleton (uma classe com instancia global)
// Essa injeção será tipada pela interface e implementada pela classe informada
container.registerSingleton<ICategoriesRepository>(
  // nome de injeção, será usado no momento de usá-la
  "CategoriesRepository",
  // classe que será injetada
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);
