import { Request, Response, Router } from "express";
import { IGetProcessLogUseCase } from "../../domain/interfaces/use-cases/process-log/get-process-log";

export const DefaultRoutes = (getProcessLog: IGetProcessLogUseCase) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    const processLog = await getProcessLog.execute();

    if (processLog) {
      const { lastUpdate, startedAt, lastSync, lastSyncStatus, baseOk, memoryUse } = processLog;

      res.send({ lastUpdate, startedAt, lastSync, lastSyncStatus, baseOk, memoryUse });
    } else {
      res.send({ message: "Não há log de processamento" });
    }
  });

  return router;
};
