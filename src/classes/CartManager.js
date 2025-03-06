import fs from "fs";
import { cartModel } from "../models/cart.model.js";

class CartManager {
  constructor() {
    // (this.carts = []), (this.file = "carrito.json"), this.createFile();
  }

  // createFile() {
  //   if (!fs.existsSync(this.file)) {
  //     fs.writeFileSync(this.file, JSON.stringify(this.carts));
  //   }
  // }

  // getId() {
  //   this.getCarts();
  //   let max = 0;

  //   this.carts.forEach((item) => {
  //     if (item.id > max) {
  //       max = item.id;
  //     }
  //   });
  //   return max + 1;
  // }

  async getCarts() {
    //   this.carts = JSON.parse(fs.readFileSync(this.file, "utf-8"));
    //   return this.carts;
    return await cartModel.find().lean();
  }

  async getCartById(id) {
    // this.getCarts();
    // let cart = this.carts.find((item) => item.id == id);

    // return cart ? cart.products : { Error: "No se encontró el producto" };
    return await cartModel.find({ _id: id }).lean();
  }

  async createCart() {
    // const cart = { id: this.getId(), products: [] };
    // this.carts.push(cart);
    // this.saveCarts();
    await cartModel.create({ products: [] });
  }

  async addCartProduct(cid, pid) {
    // this.getCarts();
    // let cart = this.carts.find((item) => item.id == cid);
    // this.saveCarts();

    let cart = await cartModel.findOne({ _id: cid }).lean();
    let product = cart.products.find((item) => item.product == pid);

    if (product) {
      product.quantity += 1;
    } else {
      let product = { product: pid, quantity: 1 };
      cart.products.push(product);
    }

    await cartModel.updateOne({ _id: cid }, { products: cart.products });
  }

  // saveCarts() {
  //   fs.writeFileSync(this.file, JSON.stringify(this.carts));
  // }
}

export default CartManager;
