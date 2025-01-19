import { Product } from "../../models/product";
import { IProductRepository } from "../../interfaces/repositories/product-repository";
import { IGetProductByCodeUseCase } from "../../interfaces/use-cases/product/get-product-by-code";

export class GetProductByCode implements IGetProductByCodeUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(code: string): Promise<Product | null> {
    return await this.productRepository.getProductByCode(code);
  }
}
