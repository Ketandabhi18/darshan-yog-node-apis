import { Router } from "express";
import auth from "../middleware/Auth";
import {
  createSubNavCategoriesController,
  deleteSubNavCategoriesController,
  getAllSubNavCategoriesController,
  getSingleSubNavCategoriesController,
  updateSubNavCategoriesController,
} from "../controller/SubNavCategoriesController";

const SubNavCategoriesRoutes = Router();

SubNavCategoriesRoutes.post("/create", auth, createSubNavCategoriesController);
SubNavCategoriesRoutes.get("/get-all", auth, getAllSubNavCategoriesController);
SubNavCategoriesRoutes.get(
  "/get-single/:id",
  auth,
  getSingleSubNavCategoriesController
);
SubNavCategoriesRoutes.post("/update", auth, updateSubNavCategoriesController);
SubNavCategoriesRoutes.post("/delete", auth, deleteSubNavCategoriesController);

export default SubNavCategoriesRoutes;
