import { IProcessLogDataSource } from "../../data/interfaces/data-sources/process-log-data-source";
import { IProcessLogRepository } from "../interfaces/repositories/process-log-repository";
import { ProcessLog } from "../models/process-log";

export class ProcessLogRepository implements IProcessLogRepository {
  processLogDataSource: IProcessLogDataSource;

  constructor(processLogDataSource: IProcessLogDataSource) {
    this.processLogDataSource = processLogDataSource;
  }

  async createProcessLog(processLog: ProcessLog): Promise<boolean> {
    return this.processLogDataSource.create(processLog);
  }

  async getProcessLog(): Promise<ProcessLog | null> {
    return this.processLogDataSource.getOne();
  }

  async updateProduct(id: string, processLog: ProcessLog): Promise<boolean> {
    return this.processLogDataSource.update(id, processLog);
  }
}
