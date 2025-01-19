import { Product } from "../../models/product";
import { IProductRepository } from "../../interfaces/repositories/product-repository";
import { IListProductsUseCase } from "../../interfaces/use-cases/product/list-products";

export class ListProducts implements IListProductsUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(page: number, take: number): Promise<{ total: number; products: Product[] }> {
    return await this.productRepository.listProducts(page, take);
  }
}
