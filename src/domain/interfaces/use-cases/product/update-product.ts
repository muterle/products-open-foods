import { Product } from "../../../models/product";

export interface IUpdateProductUseCase {
  execute(code: string, product: Product): Promise<boolean>;
}
