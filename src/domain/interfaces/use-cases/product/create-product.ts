import { Product } from "../../../models/product";

export interface ICreateProductUseCase {
  execute(product: Product): Promise<boolean>;
}
