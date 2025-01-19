import { productMock } from "../../../../mock-data";
import { IProductRepository } from "../../../../src/domain/interfaces/repositories/product-repository";
import { Product } from "../../../../src/domain/models/product";
import { DeleteProduct } from "../../../../src/domain/use-cases/products/delete-product";

describe("Delete Product", () => {
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
      .spyOn(mockProductsRepository, "deleteProduct")
      .mockImplementation(() => Promise.resolve(true));
    const deleteProductUseCase = new DeleteProduct(mockProductsRepository);

    const result = await deleteProductUseCase.execute(code);

    expect(result).toBe(true);
    expect(mockProductsRepository.deleteProduct).toHaveBeenCalledTimes(1);
  });
});
