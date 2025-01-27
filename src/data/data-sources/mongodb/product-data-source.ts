import { Db } from "mongodb";
import { Product } from "../../../domain/models/product";
import { IProductDataSource } from "../../interfaces/data-sources/product-data-source";
import { ProductStatus } from "../../../domain/enums";

export class ProductDataSource implements IProductDataSource {
  private productDS;

  constructor(database: Db) {
    this.productDS = database.collection<Product>("products");
  }

  async create(product: Product): Promise<boolean> {
    const result = await this.productDS.insertOne(product);
    return result.insertedId !== null;
  }

  async listAll(page: number, take: number): Promise<{ total: number; products: Product[] }> {
    if (!page) page = 1;
    if (!take) take = 20;

    const total = await this.productDS.countDocuments();
    const result = await this.productDS
      .find({})
      .limit(take)
      .skip((page - 1) * take)
      .toArray();

    return { total, products: result as any };
  }

  async getByCode(code: string): Promise<Product | null> {
    const result = await this.productDS.findOne({ code });
    return result;
  }

  async update(code: string, product: Product): Promise<boolean> {
    const result = await this.productDS.updateOne({ code }, { $set: product });
    return result.modifiedCount > 0;
  }

  async delete(code: string): Promise<boolean> {
    const result = await this.productDS.updateOne(
      { code },
      { $set: { status: ProductStatus.TRASH } }
    );
    return result.modifiedCount > 0;
  }
}
