import { ProcessLog } from "../../models/process-log";

export interface IProcessLogRepository {
  createProcessLog(processLog: ProcessLog): Promise<boolean>;
  getProcessLog(): Promise<ProcessLog | null>;
  updateProduct(id: string, processLog: ProcessLog): Promise<boolean>;
}
