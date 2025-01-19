import { ProcessLog } from "../../../models/process-log";

export interface IUpdateProcessLogUseCase {
  execute(id: string, processLog: ProcessLog): Promise<boolean>;
}
