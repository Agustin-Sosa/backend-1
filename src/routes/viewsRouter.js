import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const viewsRouter = Router();
const PM = new ProductManager();

viewsRouter.get("/", async (req, res) => {
  const { limit, page, query, sort } = req.query;
  let products = await PM.getProducts(limit, page, query, sort);

  res.render("index", { products: products });
});

viewsRouter.get("/products/", async (req, res) => {
  const { limit, page, query, sort } = req.query;
  let products = await PM.getProducts(limit, page, query, sort);

  res.render("index", { products: products });
});

viewsRouter.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  let product = await PM.getProductsById(pid);
  if (product && Array.isArray(product)) {
    product = product[0];
  }

  res.render("product", { product: product });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts");
});

export default viewsRouter;
