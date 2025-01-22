import { Request, Response, Router } from "express";
import { IListProductsUseCase } from "../../domain/interfaces/use-cases/product/list-products";
import { IGetProductByCodeUseCase } from "../../domain/interfaces/use-cases/product/get-product-by-code";
import { IUpdateProductUseCase } from "../../domain/interfaces/use-cases/product/update-product";
import { IDeleteProductUseCase } from "../../domain/interfaces/use-cases/product/delete-product";

export const ProductsRoutes = (
  listProductsUseCase: IListProductsUseCase,
  getProductByCodeUseCase: IGetProductByCodeUseCase,
  updateProductUseCase: IUpdateProductUseCase,
  deleteProductUseCase: IDeleteProductUseCase
) => {
  const router = Router();

  router.get("/products/:code", async (req: Request, resp: Response) => {
    try {
      const { code } = req.params;

      const product = await getProductByCodeUseCase.execute(code);

      resp.status(200).json(product);
    } catch (_) {
      resp.status(500).send({ message: "Erro ao buscar produto" });
    }
  });

  router.get("/products", async (req: Request, resp: Response) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const take = req.query.limit ? parseInt(req.query.limit as string) : 20;

      const products = await listProductsUseCase.execute(page, take);

      resp.status(200).send(products);
    } catch (_) {
      resp.status(500).send({ message: "Erro ao buscar produtos" });
    }
  });

  router.put("/products/:code", async (req: Request, resp: Response) => {
    try {
      const { code } = req.params;

      const updated = await updateProductUseCase.execute(code, req.body);

      resp.status(200).send(updated);
    } catch (error) {
      resp.status(500).send({ message: "Erro ao atualizar produto" });
    }
  });

  router.delete("/products/:code", async (req: Request, resp: Response) => {
    try {
      const { code } = req.params;
      const deleted = await deleteProductUseCase.execute(code);
      resp.status(200).send(deleted);
    } catch (error) {
      resp.status(500).send({ message: "Erro ao deletar produto" });
    }
  });

  return router;
};
