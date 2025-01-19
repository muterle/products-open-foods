import { ProcessLog } from "../../../models/process-log";

export interface IGetProcessLogUseCase {
  execute(): Promise<ProcessLog | null>;
}
