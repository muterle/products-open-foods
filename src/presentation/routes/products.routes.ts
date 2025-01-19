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

  router.get("/:code", async (req: Request, resp: Response) => {
    try {
      const { code } = req.params;

      const product = await getProductByCodeUseCase.execute(code);

      resp.send(product);
    } catch (_) {
      resp.status(500).send({ message: "Erro ao buscar produto" });
    }
  });

  router.get("/", async (req: Request, resp: Response) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const take = req.query.limit ? parseInt(req.query.limit as string) : 20;

      const products = await listProductsUseCase.execute(page, take);

      resp.send(products);
    } catch (_) {
      resp.status(500).send({ message: "Erro ao buscar produtos" });
    }
  });

  router.put("/:code", async (req: Request, resp: Response) => {
    try {
      const { code } = req.params;

      const updated = await updateProductUseCase.execute(code, req.body);

      resp.send(updated);
    } catch (error) {
      resp.status(500).send({ message: "Erro ao atualizar produto" });
    }
  });

  router.delete("/:code", async (req: Request, resp: Response) => {
    try {
      const { code } = req.params;
      const deleted = await deleteProductUseCase.execute(code);
      resp.send(deleted);
    } catch (error) {
      resp.status(500).send({ message: "Erro ao deletar produto" });
    }
  });

  return router;
};
