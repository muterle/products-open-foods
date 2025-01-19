import { Product } from "../../models/product";
import { IProductRepository } from "../../interfaces/repositories/product-repository";
import { IUpdateProductUseCase } from "../../interfaces/use-cases/product/update-product";

export class UpdateProduct implements IUpdateProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(code: string, product: Product): Promise<boolean> {
    return await this.productRepository.updateProduct(code, product);
  }
}
