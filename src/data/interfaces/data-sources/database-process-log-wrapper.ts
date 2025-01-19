import { ProcessLog } from "../../../domain/models/process-log";

export interface IDatabaseProcessLogWrapper {
  insert(processLog: ProcessLog): Promise<boolean>;
  find(): Promise<ProcessLog[]>;
  update(id: string, processLog: ProcessLog): Promise<boolean>;
}
