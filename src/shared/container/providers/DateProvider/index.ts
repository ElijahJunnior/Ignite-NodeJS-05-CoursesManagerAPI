import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDataProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
