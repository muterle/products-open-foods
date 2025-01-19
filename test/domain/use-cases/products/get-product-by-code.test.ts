import { productMock } from "../../../../mock-data";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { Product } from "../../../../src/domain/models/product";
import { GetProductByCode } from "../../../../src/domain/use-cases/products/get-product-by-code";

describe("Get Product By Code Use Case", () => {
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
    const resultData = productMock;
    const code = "valide_code";

    jest
      .spyOn(mockProductsRepository, "getProductByCode")
      .mockImplementation(() => Promise.resolve(resultData));
    const getProductByCodeUseCase = new GetProductByCode(mockProductsRepository);

    const result = await getProductByCodeUseCase.execute(code);

    expect(result).toBe(resultData);
    expect(mockProductsRepository.getProductByCode).toHaveBeenCalledTimes(1);
  });
});
