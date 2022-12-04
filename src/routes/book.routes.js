import express from "express";
import * as bookController from "../controllers/book.controller.js";

const bookRoutes = express.Router();
const basePath = "/books";

bookRoutes.get(`${basePath}`, bookController.getIndex);

bookRoutes.get(`${basePath}/create`, bookController.getCreate);
bookRoutes.post(`${basePath}/create`, bookController.postCreate);

bookRoutes.get(`${basePath}/edit/:bookId`, bookController.getEdit);
bookRoutes.post(`${basePath}/edit`, bookController.postEdit);

bookRoutes.get(`${basePath}/delete/:bookId`, bookController.getDelete);
bookRoutes.post(`${basePath}/delete`, bookController.postDelete);

export default bookRoutes;
