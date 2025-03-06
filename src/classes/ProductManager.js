import fs from "fs";
import { productsModel } from "../models/products.model.js";
import { log } from "console";

class ProductManager {
  constructor() {
    this.products = [];
    // (this.file = "productos.json"), this.createFile();
  }

  // createFile() {
  //   if (!fs.existsSync(this.file)) {
  //     fs.writeFileSync(this.file, JSON.stringify(this.products));
  //   }
  // }

  async getProducts() {
    // this.products = JSON.parse(fs.readFileSync(this.file, "utf-8"));

    return await productsModel.find().lean();
  }

  // getId() {
  //   this.getProducts();
  //   let max = 0;

  //   this.products.forEach((item) => {
  //     if (item.id > max) {
  //       max = item.id;
  //     }
  //   });
  //   return max + 1;
  // }

  async getProductsById(id) {
    // this.getProducts();
    let product = await productsModel.find({ _id: id });

    return product ? product : { Error: "No se encontró el producto" };
  }

  async addProducts(product) {
    // this.getProducts();
    // let newProduct = { id: this.getId(), ...product };
    // this.products.push(newProduct);
    // this.saveProducts();

    await productsModel.create({ ...product });
  }

  async editProducts(id, product) {
    // this.getProducts();
    // let actualProduct = this.products.find((item) => item.id == id);
    // (actualProduct.title = product.title),
    //   (actualProduct.description = product.description),
    //   (actualProduct.code = product.code),
    //   (actualProduct.price = product.price),
    //   (actualProduct.status = product.status),
    //   (actualProduct.category = product.category),
    //   (actualProduct.thumbnails = product.thumbnails);
    // this.saveProducts();
    await productsModel.updateOne({ _id: id }, { ...product });
  }

  async deleteProducts(id) {
    // this.getProducts();
    // this.products = this.products.filter((item) => item.id != id);
    // this.saveProducts();
    await productsModel.deleteOne({ _id: id });
  }

  // saveProducts() {
  //   fs.writeFileSync(this.file, JSON.stringify(this.products));
  // }
}

export default ProductManager;
