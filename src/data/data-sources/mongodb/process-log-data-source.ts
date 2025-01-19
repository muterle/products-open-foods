import { ProcessLog } from "../../../domain/models/process-log";
import { IDatabaseProcessLogWrapper } from "../../interfaces/data-sources/database-process-log-wrapper";
import { IProcessLogDataSource } from "../../interfaces/data-sources/process-log-data-source";

export class ProcessLogDataSource implements IProcessLogDataSource {
  private database: IDatabaseProcessLogWrapper;

  constructor(database: IDatabaseProcessLogWrapper) {
    this.database = database;
  }

  async create(processLog: ProcessLog): Promise<boolean> {
    return await this.database.insert(processLog);
  }

  async getOne(): Promise<ProcessLog | null> {
    const logs = await this.database.find();
    if (logs.length > 0) {
      return logs[0];
    }
    return null;
  }

  async update(id: string, processLog: ProcessLog): Promise<boolean> {
    return await this.database.update(id, processLog);
  }
}
