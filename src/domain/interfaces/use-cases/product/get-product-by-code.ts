import { Product } from "../../../models/product";

export interface IGetProductByCodeUseCase {
  execute(code: string): Promise<Product | null>;
}
