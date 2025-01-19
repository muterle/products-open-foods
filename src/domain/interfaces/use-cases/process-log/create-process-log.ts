import { ProcessLog } from "../../../models/process-log";

export interface ICreateProcessLogUseCase {
  execute(processLog: ProcessLog): Promise<boolean>;
}
