import { IProcessLogRepository } from "../../interfaces/repositories/process-log-repository";
import { ICreateProcessLogUseCase } from "../../interfaces/use-cases/process-log/create-process-log";
import { ProcessLog } from "../../models/process-log";

export class CreateProcessLog implements ICreateProcessLogUseCase {
  private processLogRepository: IProcessLogRepository;

  constructor(processLogRepository: IProcessLogRepository) {
    this.processLogRepository = processLogRepository;
  }

  async execute(processLog: ProcessLog): Promise<boolean> {
    return await this.processLogRepository.createProcessLog(processLog);
  }
}
