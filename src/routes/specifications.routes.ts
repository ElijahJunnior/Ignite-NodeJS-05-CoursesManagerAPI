import { Router } from "express";

import { SpecificationsRepository } from "../modules/Cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/Cars/services/CreateSpecificationService";

const specificationsRepository = new SpecificationsRepository();

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository
  );

  createSpecificationService.execute({ name, description });

  return res.status(201).send();
});

export { specificationsRoutes };
