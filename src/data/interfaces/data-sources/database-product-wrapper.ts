import { Product } from "../../../domain/models/product";

export interface IDatabaseProductWrapper {
  insert(product: Product): Promise<boolean>;
  find(page: number, take: number): Promise<{ total: number; products: Product[] }>;
  findOne(code: string): Promise<Product | null>;
  update(code: string, product: Product): Promise<boolean>;
  delete(code: string): Promise<boolean>;
}
