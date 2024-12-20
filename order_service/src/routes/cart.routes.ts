import express, { NextFunction , Response , Request} from "express";
import * as service from "../services/cart.service"
import * as repository from "../repository/cart.repository"

const router = express.Router();
const repo = repository.CartRepository;

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const data = await service.CreateCart(req.body, repo);
    res.status(200).json(data);
    return;
})
router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const data = await service.GetCart(req.body, repo);
    res.status(200).json(data);
    return;
})
router.patch("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const data = await service.UpdateCart(req.body, repo);
    res.status(200).json(data);
    return;
})
router.delete("/cart", async (req: Request, res: Response, next: NextFunction) => {
    const data = await service.DeleteCart(req.body, repo);
    res.status(200).json(data);
    return;
})

export default router;