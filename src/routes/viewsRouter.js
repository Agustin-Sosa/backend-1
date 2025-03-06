import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const viewsRouter = Router();
const PM = new ProductManager();

viewsRouter.get("/", async (req, res) => {
  const { limit, page, query, sort } = req.query;
  let result = await PM.getProducts(limit, page, query, sort);

  res.render("home", { result: result });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

export default viewsRouter;
