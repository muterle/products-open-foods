import { ProcessLogStatus } from "../enums";

export interface ProcessLog {
  id?: string;
  lastUpdate?: Date;
  startedAt?: Date;
  lastSync?: Date;
  lastSyncStatus?: ProcessLogStatus;
  baseOk?: boolean;
  memoryUse?: {
    rss?: number;
    heapTotal?: number;
    heapUsed?: number;
    external?: number;
    arrayBuffers?: number;
  };
}
