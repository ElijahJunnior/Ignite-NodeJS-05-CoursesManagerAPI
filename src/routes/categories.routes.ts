import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/Cars/useCases/createCategory/CreateCategoryController";
import { importCategoryController } from "../modules/Cars/useCases/importCategory";
import { listCategoriesController } from "../modules/Cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
