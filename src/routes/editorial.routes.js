import express from "express";
import * as editorialController from "../controllers/editorial.controller.js";

const editorialRoutes = express.Router();
const basePath = "/editorials";

editorialRoutes.get(`${basePath}`, editorialController.getIndex);

editorialRoutes.get(`${basePath}/create`, editorialController.getCreate);
editorialRoutes.post(`${basePath}/create`, editorialController.postCreate);

editorialRoutes.get(
  `${basePath}/edit/:editorialId`,
  editorialController.getEdit
);
editorialRoutes.post(`${basePath}/edit`, editorialController.postEdit);

editorialRoutes.get(
  `${basePath}/delete/:editorialId`,
  editorialController.getDelete
);
editorialRoutes.post(`${basePath}/delete`, editorialController.postDelete);

export default editorialRoutes;
