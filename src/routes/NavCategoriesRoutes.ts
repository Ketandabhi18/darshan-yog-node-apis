import { Router } from "express";
import {
  createNavCategoriesController,
  deleteNavCategoryController,
  getAllNavCategoryController,
  getSingleNavCategoryController,
  updateNavCategoryController,
} from "../controller/NavCategoriesController";
import auth from "../middleware/Auth";
const NavCategoriesRoutes = Router();

NavCategoriesRoutes.post("/create", auth, createNavCategoriesController);
NavCategoriesRoutes.get("/get-all", auth, getAllNavCategoryController);
NavCategoriesRoutes.get(
  "/get-single/:id",
  auth,
  getSingleNavCategoryController
);
NavCategoriesRoutes.post("/update", auth, updateNavCategoryController);
NavCategoriesRoutes.post("/delete", auth, deleteNavCategoryController);

export default NavCategoriesRoutes;
