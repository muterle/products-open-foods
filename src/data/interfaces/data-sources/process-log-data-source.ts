import { ProcessLog } from "../../../domain/models/process-log";

export interface IProcessLogDataSource {
  create(product: ProcessLog): Promise<boolean>;
  getOne(): Promise<ProcessLog | null>;
  update(id: string, product: ProcessLog): Promise<boolean>;
}
