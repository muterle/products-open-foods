import { IProcessLogRepository } from "../../interfaces/repositories/process-log-repository";
import { IUpdateProcessLogUseCase } from "../../interfaces/use-cases/process-log/update-process-log";
import { ProcessLog } from "../../models/process-log";

export class UpdateProcessLog implements IUpdateProcessLogUseCase {
  private processLogRepository: IProcessLogRepository;

  constructor(processLogRepository: IProcessLogRepository) {
    this.processLogRepository = processLogRepository;
  }

  async execute(id: string, processLog: ProcessLog): Promise<boolean> {
    return this.processLogRepository.updateProduct(id, processLog);
  }
}
