import { productMock } from "../../../../mock-data";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { Product } from "../../../../src/domain/models/product";
import { UpdateProduct } from "../../../../src/domain/use-cases/products/update-product";

describe("Update Product", () => {
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

  test("should return true with success", async () => {
    const inputData = productMock;
    const code = "valide_code";

    jest
      .spyOn(mockProductsRepository, "updateProduct")
      .mockImplementation(() => Promise.resolve(true));
    const updateProductUseCase = new UpdateProduct(mockProductsRepository);

    const result = await updateProductUseCase.execute(code, inputData);

    expect(result).toBe(true);
    expect(mockProductsRepository.updateProduct).toHaveBeenCalledTimes(1);
  });
});
