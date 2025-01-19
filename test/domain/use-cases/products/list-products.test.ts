import { listProducts, productMock } from "../../../../mock-data";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { Product } from "../../../../src/domain/models/product";
import { ListProducts } from "../../../../src/domain/use-cases/products/list-products";

describe("List Products", () => {
  class MockProductsRepository implements IProductRepository {
    createProduct(product: Product): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    listProducts(page: number, take: number): Promise<{ total: number; products: Product[] }> {
      throw new Error("Method not implemented.");
    }
    getProductByCode(code: string): Promise<Product | null> {
      throw new Error("Method not implemented.");
    }
    updateProduct(code: string, product: Product): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
    deleteProduct(code: string): Promise<boolean> {
      throw new Error("Method not implemented.");
    }
  }

  let mockProductsRepository: IProductRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockProductsRepository = new MockProductsRepository();
  });

  test("should return product by code", async () => {
    const resultData = listProducts;
    const code = "valide_code";

    jest
      .spyOn(mockProductsRepository, "listProducts")
      .mockImplementation(() => Promise.resolve(resultData));
    const listProductsUseCase = new ListProducts(mockProductsRepository);

    const result = await listProductsUseCase.execute(1, 10);

    expect(result).toBe(resultData);
    expect(mockProductsRepository.listProducts).toHaveBeenCalledTimes(1);
  });
});
