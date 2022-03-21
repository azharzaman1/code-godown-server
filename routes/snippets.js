import express from "express";
import { userRoles } from "../config/userRoles.js";
import {
  addSnippet,
  deleteSnippet,
  getManySnippets,
  getSnippetById,
  getSnippets,
  updateSnippet,
} from "../controllers/snippetsController.js";
import verifyRoles from "../middlewares/verifyRoles.js";
const snippetsRouter = express.Router();

// Routes

snippetsRouter.get("/:id", getSnippetById); // everyone can hit

snippetsRouter.get("/", getSnippets); // everyone can hit

snippetsRouter.post("/many", getManySnippets); // everyone can hit

snippetsRouter.post("/", verifyRoles(userRoles.Admin), addSnippet); // only admin can hit

snippetsRouter.put("/:id", verifyRoles(userRoles.Admin), updateSnippet); // only admin can hit

snippetsRouter.delete("/:id", verifyRoles(userRoles.Admin), deleteSnippet); // only admin can hit

export default snippetsRouter;
