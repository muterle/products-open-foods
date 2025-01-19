import { IProductRepository } from "../../interfaces/repositories/product-repository";
import { IDeleteProductUseCase } from "../../interfaces/use-cases/product/delete-product";

export class DeleteProduct implements IDeleteProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(code: string): Promise<boolean> {
    return await this.productRepository.deleteProduct(code);
  }
}
