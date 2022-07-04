import { Router } from "express";

import { createSpecificationController } from "../modules/Cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

export { specificationsRoutes };
