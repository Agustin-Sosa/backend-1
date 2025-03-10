import { productsModel } from "../models/products.model.js";

class ProductManager {
  async getProducts(limit, page, query, sort) {
    try {
      limit = limit ? limit : 10;
      page = page >= 1 ? page : 1;
      query = query ? query : "";
      sort = sort === "desc" ? { price: -1 } : { price: 1 };
      let result;

      if (query) {
        result = await productsModel.paginate(
          { category: query },
          { limit: limit, page: page, sort: sort, lean: true }
        );
      } else {
        result = await productsModel.paginate(
          {},
          { limit: limit, page: page, sort: sort, lean: true }
        );
      }

      result = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? "/?limit=" + limit + "&page=" + (result.page - 1)
          : null,
        nextLink: result.hasNextPage
          ? "/?limit=" + limit + "&page=" + (result.page + 1)
          : null,
      };

      return result;
    } catch (error) {
      return { status: "error", payload: "" };
    }
  }

  async getProductsById(id) {
    let product = await productsModel.find({ _id: id }).lean();
    return product ? product : { Error: "No se encontró el producto" };
  }

  async addProducts(product) {
    await productsModel.create({ ...product });
  }

  async editProducts(id, product) {
    await productsModel.updateOne({ _id: id }, { ...product });
  }

  async deleteProducts(id) {
    await productsModel.deleteOne({ _id: id });
  }
}

export default ProductManager;
