import express, { NextFunction , Response , Request} from "express";
import * as service from "../services/cart.service"
import * as repository from "../repository/cart.repository"

const router = express.Router();
const repo = repository.CartRepository;

//Adding auth middleware to all the routes
// const authMiddleware = async()=>{
//     next();
// }

// router.use(authMiddleware);

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
router.patch("/cart/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {
    const lineItemId = req.params.lineItemId;
    const data = await service.UpdateCart({id: +lineItemId, qty: req.body.qty}, repo);
    res.status(200).json(data);
    return;
})
router.delete("/cart/:lineItemId", async (req: Request, res: Response, next: NextFunction) => {
    const lineItemId = req.params.lineItemId;
    const data = await service.DeleteCart(req.body, repo);
    res.status(200).json(data);
    return;
})

export default router;