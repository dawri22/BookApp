import express from "express";
import * as homeController from "../controllers/home.controller.js";

const homeRoutes = express.Router();
const basePath = "/home";

homeRoutes.get("/", homeController.getIndex);
homeRoutes.post(`${basePath}/filter`, homeController.getByFilters);
homeRoutes.get(`${basePath}/filter`, homeController.getByFilters);
homeRoutes.get(`${basePath}/:bookId`, homeController.getBook);

export default homeRoutes;
