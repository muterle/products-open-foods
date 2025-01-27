import { Db } from "mongodb";
import { ProcessLog } from "../../../domain/models/process-log";
import { IProcessLogDataSource } from "../../interfaces/data-sources/process-log-data-source";

export class ProcessLogDataSource implements IProcessLogDataSource {
  private processLogDS;

  constructor(database: Db) {
    this.processLogDS = database.collection<ProcessLog>("processLog");
  }

  async create(processLog: ProcessLog): Promise<boolean> {
    const result = await this.processLogDS.insertOne(processLog);
    return result.insertedId !== null;
  }

  async getOne(): Promise<ProcessLog | null> {
    const logs = await this.processLogDS.find({}).toArray();
    if (logs.length > 0) {
      return logs[0];
    }
    return null;
  }

  async update(id: string, processLog: ProcessLog): Promise<boolean> {
    const result = await this.processLogDS.updateOne({ id: id }, { $set: processLog });
    return result.modifiedCount > 0;
  }
}
