import express from "express";
import * as categoryController from "../controllers/category.controller.js";

const categoryRoutes = express.Router();
const basePath = "/categories";

categoryRoutes.get(`${basePath}`, categoryController.getIndex);

categoryRoutes.get(`${basePath}/create`, categoryController.getCreate);
categoryRoutes.post(`${basePath}/create`, categoryController.postCreate);

categoryRoutes.get(`${basePath}/edit/:categoryId`, categoryController.getEdit);
categoryRoutes.post(`${basePath}/edit`, categoryController.postEdit);

categoryRoutes.get(
  `${basePath}/delete/:categoryId`,
  categoryController.getDelete
);
categoryRoutes.post(`${basePath}/delete`, categoryController.postDelete);

export default categoryRoutes;
