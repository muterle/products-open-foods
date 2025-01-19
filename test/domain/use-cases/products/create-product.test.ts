import { productMock } from "../../../../mock-data";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { Product } from "../../../../src/domain/models/product";
import { CreateProduct } from "../../../../src/domain/use-cases/products/create-product";

describe("Create Product Use Case", () => {
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

  test("should return true", async () => {
    const inputData = productMock;

    jest
      .spyOn(mockProductsRepository, "createProduct")
      .mockImplementation(() => Promise.resolve(true));
    const createProductUseCase = new CreateProduct(mockProductsRepository);

    const result = await createProductUseCase.execute(inputData);

    expect(result).toBe(true);
    expect(mockProductsRepository.createProduct).toHaveBeenCalledTimes(1);
  });
});
