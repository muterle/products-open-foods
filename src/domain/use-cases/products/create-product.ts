import { Product } from "../../models/product";
import { IProductRepository } from "../../interfaces/repositories/product-repository";
import { ICreateProductUseCase } from "../../interfaces/use-cases/product/create-product";

export class CreateProduct implements ICreateProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(product: Product): Promise<boolean> {
    return await this.productRepository.createProduct(product);
  }
}
