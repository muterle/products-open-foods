import { Product } from "../../../models/product";

export interface IListProductsUseCase {
  execute(page: number, take: number): Promise<{ total: number; products: Product[] }>;
}
