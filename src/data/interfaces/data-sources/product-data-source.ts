import { Product } from "../../../domain/models/product";

export interface IProductDataSource {
  create(product: Product): Promise<boolean>;
  listAll(page: number, take: number): Promise<{ total: number; products: Product[] }>;
  getByCode(code: string): Promise<Product | null>;
  update(code: string, product: Product): Promise<boolean>;
  delete(code: string): Promise<boolean>;
}
