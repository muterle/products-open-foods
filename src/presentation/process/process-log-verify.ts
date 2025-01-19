import { ICreateProcessLogUseCase } from "../../domain/interfaces/use-cases/process-log/create-process-log";
import { IGetProcessLogUseCase } from "../../domain/interfaces/use-cases/process-log/get-process-log";
import { IUpdateProcessLogUseCase } from "../../domain/interfaces/use-cases/process-log/update-process-log";
import { ProcessLog } from "../../domain/models/process-log";
import { v4 as uuidv4 } from "uuid";

export class ProcessLogVerify {
  private getProcessLog: IGetProcessLogUseCase;
  private createProcessLog: ICreateProcessLogUseCase;
  private updateProcessLog: IUpdateProcessLogUseCase;

  constructor(
    getProcessLog: IGetProcessLogUseCase,
    createProcessLog: ICreateProcessLogUseCase,
    updateProcessLog: IUpdateProcessLogUseCase
  ) {
    this.getProcessLog = getProcessLog;
    this.createProcessLog = createProcessLog;
    this.updateProcessLog = updateProcessLog;
  }

  async execute(processLog: ProcessLog) {
    const processLogExists = await this.getProcessLog.execute();

    if (!processLogExists) {
      processLog.id = uuidv4();
      await this.createProcessLog.execute(processLog);
    } else {
      const { startedAt, baseOk, lastSync, lastSyncStatus, memoryUse, lastUpdate } = processLog;

      if (startedAt) processLogExists.startedAt = startedAt;
      if (lastUpdate) processLogExists.lastUpdate = lastUpdate;
      if (baseOk) processLogExists.baseOk = baseOk;
      if (lastSync) processLogExists.lastSync = lastSync;
      if (lastSyncStatus) processLogExists.lastSyncStatus = lastSyncStatus;
      if (memoryUse) processLogExists.memoryUse = memoryUse;

      await this.updateProcessLog.execute(`${processLogExists.id}`, processLogExists);
    }
  }
}
