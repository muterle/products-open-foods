import { Product } from "../../models/product";

export interface IProductRepository {
  createProduct(product: Product): Promise<boolean>;
  listProducts(page: number, take: number): Promise<{ total: number; products: Product[] }>;
  getProductByCode(code: string): Promise<Product | null>;
  updateProduct(code: string, product: Product): Promise<boolean>;
  deleteProduct(code: string): Promise<boolean>;
}
