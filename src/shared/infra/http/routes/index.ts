import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carRouter } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/cars", carRouter);
router.use("/categories", categoriesRoutes);
router.use("/password", passwordRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", userRoutes);

export { router };
