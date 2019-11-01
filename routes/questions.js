import express from "express";
import questionsControllers from "../controllers/questionsControllers"
const router = express.Router();
/* GET home page. */

// ntgs
router.get("/", questionsControllers.listAllQuestions);
router.post("/", questionsControllers.addQuestion);
router.get("/search", questionsControllers.searchQuestion);

export default router;
