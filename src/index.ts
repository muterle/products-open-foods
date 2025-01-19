import express, { Express } from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import cron from "node-cron";
const { memoryUsage } = require("node:process");
import server from "./server";
import { DefaultRoutes } from "./presentation/routes/default.routes";
import { ProductsRoutes } from "./presentation/routes/products.routes";
import { ProductRepository } from "./domain/repositories/product-repository";
import { IDatabaseProductWrapper } from "./data/interfaces/data-sources/database-product-wrapper";
import { Product } from "./domain/models/product";
import { CreateProduct } from "./domain/use-cases/products/create-product";
import { IProductDataSource } from "./data/interfaces/data-sources/product-data-source";
import { ListProducts } from "./domain/use-cases/products/list-products";
import { GetProductByCode } from "./domain/use-cases/products/get-product-by-code";
import { UpdateProduct } from "./domain/use-cases/products/update-product";
import { DeleteProduct } from "./domain/use-cases/products/delete-product";
import { ProcessOpenFoods } from "./presentation/integrations/process-open-foods";
import { ProcessLogStatus, ProductStatus } from "./domain/enums";
import { IProcessLogDataSource } from "./data/interfaces/data-sources/process-log-data-source";
import { ProcessLog } from "./domain/models/process-log";
import { ProcessLogRepository } from "./domain/repositories/process-log-repository";
import { GetProcessLog } from "./domain/use-cases/process-log/get-process-log";
import { ProcessLogVerify } from "./presentation/process/process-log-verify";
import { CreateProcessLog } from "./domain/use-cases/process-log/create-process-log";
import { UpdateProcessLog } from "./domain/use-cases/process-log/update-process-log";

dotenv.config();
const port = process.env.PORT;
const cronJobFoods = process.env.CRON_JOB_FOODS as string;
const cronJobProcess = process.env.CRON_JOB_PROCESS as string;

(async () => {
  const client: MongoClient = new MongoClient(`${process.env.MONGO_URI}`);
  await client.connect();
  const db = client.db(`${process.env.MONGO_DB}`);

  const processLogDataSource: IProcessLogDataSource = {
    async create(processLog) {
      const result = await db.collection("processLog").insertOne(processLog);
      return result.insertedId !== null;
    },
    async getOne() {
      const processLogs = await db.collection<ProcessLog[]>("processLog").find({}).toArray();

      if (processLogs.length > 0) {
        return processLogs[0] as any;
      }
      return null;
    },
    async update(id, processLog) {
      const result = await db
        .collection<ProcessLog>("processLog")
        .updateOne({ id: id }, { $set: processLog });
      return result.modifiedCount > 0;
    },
  };

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

  const productDataSource: IProductDataSource = {
    async listAll(page, take) {
      if (!page) page = 1;
      if (!take) take = 20;

      const total = await db.collection("products").countDocuments();
      const result = await db
        .collection<Product[]>("products")
        .find({})
        .limit(take)
        .skip((page - 1) * take)
        .toArray();

      return { total, products: result as any };
    },
    async getByCode(code) {
      const result = await db.collection<Product>("products").findOne({ code });
      return result;
    },
    async update(code, product) {
      const result = await db
        .collection<Product>("products")
        .updateOne({ code }, { $set: product });
      return result.modifiedCount > 0;
    },
    async delete(code) {
      const result = await db
        .collection<Product>("products")
        .updateOne({ code }, { $set: { status: ProductStatus.TRASH } });
      return result.modifiedCount > 0;
    },
    async create(product) {
      const result = await db.collection("products").insertOne(product);
      return result.insertedId !== null;
    },
  };

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
  server.use("/products", productsRoutes);

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
