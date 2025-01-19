import { IProductDataSource } from "../../data/interfaces/data-sources/product-data-source";
import { Product } from "../models/product";
import { IProductRepository } from "../interfaces/repositories/product-repository";

export class ProductRepository implements IProductRepository {
  productDataSource: IProductDataSource;

  constructor(productDataSource: IProductDataSource) {
    this.productDataSource = productDataSource;
  }

  async createProduct(product: Product): Promise<boolean> {
    return this.productDataSource.create(product);
  }

  async listProducts(page: number, take: number): Promise<{ total: number; products: Product[] }> {
    return this.productDataSource.listAll(page, take);
  }

  async getProductByCode(code: string): Promise<Product | null> {
    return this.productDataSource.getByCode(code);
  }

  async updateProduct(code: string, product: Product): Promise<boolean> {
    return this.productDataSource.update(code, product);
  }

  async deleteProduct(code: string): Promise<boolean> {
    return this.productDataSource.delete(code);
  }
}
