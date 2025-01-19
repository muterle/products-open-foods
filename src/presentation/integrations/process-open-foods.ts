import axios from "axios";
const zlib = require("zlib");
import { IProcessOpenFoods } from "../../domain/interfaces/integrations/process-open-foods";
import { ICreateProductUseCase } from "../../domain/interfaces/use-cases/product/create-product";
import { IGetProductByCodeUseCase } from "../../domain/interfaces/use-cases/product/get-product-by-code";
import { IUpdateProductUseCase } from "../../domain/interfaces/use-cases/product/update-product";
import { Product } from "../../domain/models/product";
import { ProductStatus } from "../../domain/enums";
import { GetFilesOpenFoods } from "./get-files-open-foods";
import { GetFileDataOpenFoods } from "./get-file-data-open-foods";

export class ProcessOpenFoods implements IProcessOpenFoods {
  private createProduct: ICreateProductUseCase;
  private getProductByCode: IGetProductByCodeUseCase;
  private updateProduct: IUpdateProductUseCase;

  constructor(
    createProduct: ICreateProductUseCase,
    getProductByCode: IGetProductByCodeUseCase,
    updateProduct: IUpdateProductUseCase
  ) {
    this.createProduct = createProduct;
    this.getProductByCode = getProductByCode;
    this.updateProduct = updateProduct;
  }

  async execute(): Promise<boolean> {
    try {
      const files = await new GetFilesOpenFoods().execute();

      for await (const file of files) {
        const items = await new GetFileDataOpenFoods().execute(file);

        const itemsToProcess = items.length > 100 ? items.slice(0, 100) : items;

        for await (const item of itemsToProcess) {
          const {
            code,
            url,
            creator,
            created_t,
            last_modified_t,
            product_name,
            quantity,
            brands,
            categories,
            labels,
            cities,
            purchase_places,
            stores,
            ingredients_text,
            traces,
            serving_size,
            serving_quantity,
            nutriscore_score,
            nutriscore_grade,
            main_category,
            image_url,
          } = JSON.parse(item);

          const product = await this.getProductByCode.execute(code);

          const data: Product = {
            code: code,
            status: !product ? ProductStatus.PUBLISHED : product.status,
            imported_at: !product ? new Date().toISOString() : product.imported_at,
            url: url,
            creator: creator,
            created_t: created_t,
            last_modified_t: last_modified_t,
            product_name: product_name,
            quantity: quantity,
            brands: brands,
            categories: categories,
            labels: labels,
            cities: cities,
            purchase_places: purchase_places,
            stores: stores,
            ingredients_text: ingredients_text,
            traces: traces,
            serving_size: serving_size,
            serving_quantity: serving_quantity,
            nutriscore_score: nutriscore_score,
            nutriscore_grade: nutriscore_grade,
            main_category: main_category,
            image_url: image_url,
          };

          if (!product) {
            await this.createProduct.execute(data);
          } else {
            await this.updateProduct.execute(code, data);
          }
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
