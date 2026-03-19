import express from "express";
import { getAllReels } from "../controllers/reelController.js";
import { uploadReel } from '../controllers/reelController.js';
import { upload } from '../middlewares/multerMiddleware.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllReels);
router.post('/upload',protect, upload.single('video'), uploadReel);

export default router;