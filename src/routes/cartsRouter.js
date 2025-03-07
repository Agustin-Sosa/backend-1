import { Router } from "express";
import CartManager from "../classes/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.get("/", async (req, res) => {
  const carts = await CM.getCarts();
  res.send(carts);
});

cartsRouter.post("/", async (req, res) => {
  await CM.createCart();
  res.send({ estado: "OK", mensaje: "El carrito se creó con éxito" });
});

cartsRouter.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await CM.getCartById(cid);
  res.send(cart);
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  await CM.addCartProduct(cid, pid);
  res.send({ estado: "OK", mensaje: "Producto agregado al carrito con éxito" });
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  await CM.deleteProductFromCart(cid, pid);
  res.send({
    estado: "OK",
    mensaje: "Producto eliminado del carrito con éxito",
  });
});

export default cartsRouter;
