import express from "express";
import * as authorController from "../controllers/author.controller.js";

const authorRoutes = express.Router();
const basePath = "/authors";

authorRoutes.get(`${basePath}`, authorController.getIndex);

authorRoutes.get(`${basePath}/create`, authorController.getCreate);
authorRoutes.post(`${basePath}/create`, authorController.postCreate);

authorRoutes.get(`${basePath}/edit/:authorId`, authorController.getEdit);
authorRoutes.post(`${basePath}/edit`, authorController.postEdit);

authorRoutes.get(`${basePath}/delete/:authorId`, authorController.getDelete);
authorRoutes.post(`${basePath}/delete`, authorController.postDelete);

export default authorRoutes;
