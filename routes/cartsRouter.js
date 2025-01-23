import { Router } from "express";

const cartsRouter = Router();
cartsRouter.get("/", (req, res) => {
  res.send("Cart!");
});

export default cartsRouter;
