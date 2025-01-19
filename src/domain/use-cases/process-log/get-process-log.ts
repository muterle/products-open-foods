import { IProcessLogRepository } from "../../interfaces/repositories/process-log-repository";
import { IGetProcessLogUseCase } from "../../interfaces/use-cases/process-log/get-process-log";
import { ProcessLog } from "../../models/process-log";

export class GetProcessLog implements IGetProcessLogUseCase {
  private processLogRepository: IProcessLogRepository;

  constructor(processLogRepository: IProcessLogRepository) {
    this.processLogRepository = processLogRepository;
  }

  async execute(): Promise<ProcessLog | null> {
    return await this.processLogRepository.getProcessLog();
  }
}
