import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  depositAccountAndUpdatedCredit,
  transferring,
} from "../controllers/userController.js";

const router = express.Router();
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(depositAccountAndUpdatedCredit);
router.route("/:id1/:id2").put(transferring);

export default router;
