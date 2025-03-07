import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const viewsRouter = Router();
const PM = new ProductManager();

viewsRouter.get("/", async (req, res) => {
  const { limit, page, query, sort } = req.query;
  let products = await PM.getProducts(limit, page, query, sort);

  res.render("home", { products: products });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

export default viewsRouter;
