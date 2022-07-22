import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/Cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/Cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/Cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
