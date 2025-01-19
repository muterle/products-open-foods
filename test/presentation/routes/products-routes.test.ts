import request from "supertest";
import { IGetProductByCodeUseCase } from "../../../src/domain/interfaces/use-cases/product/get-product-by-code";
import { Product } from "../../../src/domain/models/product";
import { IListProductsUseCase } from "../../../src/domain/interfaces/use-cases/product/list-products";
import { IUpdateProductUseCase } from "../../../src/domain/interfaces/use-cases/product/update-product";
import { IDeleteProductUseCase } from "../../../src/domain/interfaces/use-cases/product/delete-product";
import server from "../../../src/server";
import { ProductsRoutes } from "../../../src/presentation/routes/products.routes";
import { listProducts, productMock } from "../../../mock-data";

class MockGetProductByCodeUseCase implements IGetProductByCodeUseCase {
  execute(code: string): Promise<Product | null> {
    throw new Error("Method not implemented.");
  }
}

class MockListProductsUseCase implements IListProductsUseCase {
  execute(page: number, take: number): Promise<{ total: number; products: Product[] }> {
    throw new Error("Method not implemented.");
  }
}

class MockUpdateProduct implements IUpdateProductUseCase {
  execute(code: string, product: Product): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockDeleteProduct implements IDeleteProductUseCase {
  execute(code: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("Products Router", () => {
  let mockGetProductByCodeUseCase: IGetProductByCodeUseCase;
  let mockListProductsUseCase: IListProductsUseCase;
  let mockUpdateProductUseCase: IUpdateProductUseCase;
  let mockDeleteProductUseCase: IDeleteProductUseCase;

  beforeAll(() => {
    mockGetProductByCodeUseCase = new MockGetProductByCodeUseCase();
    mockListProductsUseCase = new MockListProductsUseCase();
    mockUpdateProductUseCase = new MockUpdateProduct();
    mockDeleteProductUseCase = new MockDeleteProduct();
    server.use(
      "/products",
      ProductsRoutes(
        mockListProductsUseCase,
        mockGetProductByCodeUseCase,
        mockUpdateProductUseCase,
        mockDeleteProductUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /products/:code", () => {
    test("should return 200 and product", async () => {
      const expectedData = productMock;
      jest
        .spyOn(mockGetProductByCodeUseCase, "execute")
        .mockImplementation(() => Promise.resolve(expectedData));

      const response = await request(server).get("/products/valid_code");

      expect(response.status).toBe(200);
      expect(mockGetProductByCodeUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should return 500 on error in get by code", async () => {
      jest
        .spyOn(mockGetProductByCodeUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/products/valid_code");

      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Erro ao buscar produto" });
    });
  });

  describe("GET /products", () => {
    test("should return 200 and total with products", async () => {
      const expectedData = listProducts;
      jest
        .spyOn(mockListProductsUseCase, "execute")
        .mockImplementation(() => Promise.resolve(expectedData));

      const response = await request(server).get("/products");

      expect(response.status).toBe(200);
      expect(mockListProductsUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should return 500 on error in list", async () => {
      jest
        .spyOn(mockListProductsUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/products");

      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Erro ao buscar produtos" });
    });
  });

  describe("PUT /products/:code", () => {
    test("should return 200 and updated response", async () => {
      const updateData = productMock;
      jest
        .spyOn(mockUpdateProductUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).put("/products/valid_code").send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(true);
    });

    test("should return 500 and update error response", async () => {
      const updateData = productMock;
      jest
        .spyOn(mockUpdateProductUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).put("/products/valid_code").send(updateData);

      expect(response.status).toBe(500);
    });
  });

  describe("DELETE /products/:code", () => {
    test("should return 200 and delete response", async () => {
      jest
        .spyOn(mockDeleteProductUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).delete("/products/valid_code");

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(true);
    });

    test("should return 500 and delete error response", async () => {
      jest
        .spyOn(mockDeleteProductUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).delete("/products/valid_code");

      expect(response.status).toBe(500);
    });
  });
});
