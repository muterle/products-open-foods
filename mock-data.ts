import { ProductStatus } from "./src/domain/enums";

export const productMock = {
  code: "valid_code",
  status: ProductStatus.PUBLISHED,
  imported_at: new Date(2025, 0, 20).toString(),
  url: "valid_data",
  creator: "valid_data",
  created_t: 0,
  last_modified_t: "valid_data",
  product_name: "valid_data",
  quantity: "valid_data",
  brands: "valid_data",
  categories: "valid_data",
  labels: "valid_data",
  cities: "valid_data",
  purchase_places: "valid_data",
  stores: "valid_data",
  ingredients_text: "valid_data",
  traces: "valid_data",
  serving_size: "valid_data",
  serving_quantity: 0,
  nutriscore_score: 0,
  nutriscore_grade: "valid_data",
  main_category: "valid_data",
  image_url: "valid_data",
};

export const listProducts = { total: 1, products: [{ ...productMock }] };
