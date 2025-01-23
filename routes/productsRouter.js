import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", (req, res) => {
  let products = PM.getProducts();
  res.send(products);
});

productsRouter.get("/:pid", (req, res) => {
  let pid = req.params.pid;
  let product = PM.getProductsById(pid);
  res.send(product);
});

//add

productsRouter.post("/", (req, res) => {
  const { title, description, code, price, status, category, thumbnails } =
    req.body;

  if (!title) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'title' es obligatorio" });
    return false;
  }
  if (!description) {
    res.status(400).send({
      estado: "ERROR",
      mensaje: "El campo 'description' es obligatorio",
    });
    return false;
  }
  if (!code) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'code' es obligatorio" });
    return false;
  }
  if (!price) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'price' es obligatorio" });
    return false;
  }
  if (!status) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'status' es obligatorio" });
    return false;
  }
  if (!category) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'category' es obligatorio" });
    return false;
  }

  let product = {
    title,
    description,
    code,
    price,
    status,
    category,
    thumbnails,
  };
  PM.addProducts(product);
  res
    .status(200)
    .send({ estado: "OK", mensaje: "El producto se agregó con éxito" });
});

//edit

productsRouter.put("/:pid", (req, res) => {
  let pid = req.params.pid;
  const { title, description, code, price, status, category, thumbnails } =
    req.body;

  if (!title) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'title' es obligatorio" });
    return false;
  }
  if (!description) {
    res.status(400).send({
      estado: "ERROR",
      mensaje: "El campo 'description' es obligatorio",
    });
    return false;
  }
  if (!code) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'code' es obligatorio" });
    return false;
  }
  if (!price) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'price' es obligatorio" });
    return false;
  }
  if (!status) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'status' es obligatorio" });
    return false;
  }
  if (!category) {
    res
      .status(400)
      .send({ estado: "ERROR", mensaje: "El campo 'category' es obligatorio" });
    return false;
  }

  let product = {
    title,
    description,
    code,
    price,
    status,
    category,
    thumbnails,
  };
  PM.editProducts(pid, product);
  res
    .status(200)
    .send({ estado: "OK", mensaje: "El producto se modificó con éxito" });
});

//delete

productsRouter.delete("/:pid", (req, res) => {
  let pid = req.params.pid;
  PM.deleteProducts(pid);
  res
    .status(200)
    .send({ estado: "OK", mensaje: "El producto se eliminó con éxito" });
});

export default productsRouter;
