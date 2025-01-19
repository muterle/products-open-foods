import { Product } from "../../../domain/models/product";
import { IDatabaseProductWrapper } from "../../interfaces/data-sources/database-product-wrapper";
import { IProductDataSource } from "../../interfaces/data-sources/product-data-source";

export class ProductDataSource implements IProductDataSource {
  private database: IDatabaseProductWrapper;

  constructor(database: IDatabaseProductWrapper) {
    this.database = database;
  }

  async create(product: Product): Promise<boolean> {
    return await this.database.insert(product);
  }

  async listAll(page: number, take: number): Promise<{ total: number; products: Product[] }> {
    return await this.database.find(page, take);
  }

  async getByCode(code: string): Promise<Product | null> {
    return await this.database.findOne(code);
  }

  async update(code: string, product: Product): Promise<boolean> {
    return await this.database.update(code, product);
  }

  async delete(code: string): Promise<boolean> {
    return await this.database.delete(code);
  }
}
