import express from "express";
import { createBranch, deleteBranch, getAllBranches, getBranchById, updateBranch } from "../../controllers/Master/branchController.js";



const router = express.Router();

router.post("/", createBranch);                      
router.get("/", getAllBranches); 
router.get("/:id", getBranchById);                  
router.put("/:id", updateBranch);                    
router.delete("/:id", deleteBranch);                

export default router;
