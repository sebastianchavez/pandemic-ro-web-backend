export interface IRequestUpdateProcessLock {
  processlock_id: number;
  name: string;
  pid: number;
  type: string;
  size: number;
}
