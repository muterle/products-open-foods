import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cron from "node-cron";
const { memoryUsage } = require("node:process");
import server from "./server";
import { DefaultRoutes } from "./presentation/routes/default.routes";
import { ProductsRoutes } from "./presentation/routes/products.routes";
import { ProductRepository } from "./domain/repositories/product-repository";
import { CreateProduct } from "./domain/use-cases/products/create-product";
import { IProductDataSource } from "./data/interfaces/data-sources/product-data-source";
import { ListProducts } from "./domain/use-cases/products/list-products";
import { GetProductByCode } from "./domain/use-cases/products/get-product-by-code";
import { UpdateProduct } from "./domain/use-cases/products/update-product";
import { DeleteProduct } from "./domain/use-cases/products/delete-product";
import { ProcessOpenFoods } from "./presentation/integrations/process-open-foods";
import { ProcessLogStatus, ProductStatus } from "./domain/enums";
import { IProcessLogDataSource } from "./data/interfaces/data-sources/process-log-data-source";
import { ProcessLogRepository } from "./domain/repositories/process-log-repository";
import { GetProcessLog } from "./domain/use-cases/process-log/get-process-log";
import { ProcessLogVerify } from "./presentation/process/process-log-verify";
import { CreateProcessLog } from "./domain/use-cases/process-log/create-process-log";
import { UpdateProcessLog } from "./domain/use-cases/process-log/update-process-log";

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { ProductDataSource } from "./data/data-sources/mongodb/product-data-source";
import { ProcessLogDataSource } from "./data/data-sources/mongodb/process-log-data-source";

dotenv.config();
const port = process.env.PORT;
const cronJobFoods = process.env.CRON_JOB_FOODS as string;
const cronJobProcess = process.env.CRON_JOB_PROCESS as string;

(async () => {
  const client: MongoClient = new MongoClient(`${process.env.MONGO_URI}`);
  await client.connect();
  const db = client.db(`${process.env.MONGO_DB}`);

  const processLogDataSource: IProcessLogDataSource = new ProcessLogDataSource(db);

  const processLogVerify = new ProcessLogVerify(
    new GetProcessLog(new ProcessLogRepository(processLogDataSource)),
    new CreateProcessLog(new ProcessLogRepository(processLogDataSource)),
    new UpdateProcessLog(new ProcessLogRepository(processLogDataSource))
  );

  const res = await db.admin().ping();
  await processLogVerify.execute({
    startedAt: new Date(),
    lastUpdate: new Date(),
    baseOk: res && res.ok === 1,
    memoryUse: memoryUsage(),
  });

  const productDataSource: IProductDataSource = new ProductDataSource(db);

  const defaultRoutes = DefaultRoutes(
    new GetProcessLog(new ProcessLogRepository(processLogDataSource))
  );

  const productsRoutes = ProductsRoutes(
    new ListProducts(new ProductRepository(productDataSource)),
    new GetProductByCode(new ProductRepository(productDataSource)),
    new UpdateProduct(new ProductRepository(productDataSource)),
    new DeleteProduct(new ProductRepository(productDataSource))
  );

  server.use(defaultRoutes);
  server.use(productsRoutes);

  server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

  const processOpenFoods = new ProcessOpenFoods(
    new CreateProduct(new ProductRepository(productDataSource)),
    new GetProductByCode(new ProductRepository(productDataSource)),
    new UpdateProduct(new ProductRepository(productDataSource))
  );

  cron.schedule(cronJobFoods, async () => {
    const result = await processOpenFoods.execute();

    await processLogVerify.execute({
      lastUpdate: new Date(),
      lastSync: new Date(),
      lastSyncStatus: result ? ProcessLogStatus.OK : ProcessLogStatus.FAIL,
    });
  });

  cron.schedule(cronJobProcess, async () => {
    const res = await db.admin().ping();

    await processLogVerify.execute({
      lastUpdate: new Date(),
      baseOk: res.ok === 1,
      memoryUse: memoryUsage(),
    });
  });

  server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
})();
