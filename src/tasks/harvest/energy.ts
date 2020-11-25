// find an unused energy source, one that has not been covered or reserved by any other creeps
// priority low
// requested workers 2 / based on the energy needs

import { Task, Progress } from "../../classes/task";
export class HarvestEnergy extends Task {
  static generate(): Task[] {
    return [];
  }
  get workers(): number {
    throw new Error("Method not implemented.");
  }
  get priority(): number[] {
    throw new Error("Method not implemented.");
  }
  action(creep: Creep): void {
    throw new Error("Method not implemented.");
  }
  finished(creep: Creep): boolean {
    throw new Error("Method not implemented.");
  }
  candidates(creeps: Creep[]): Creep[] {
    throw new Error("Method not implemented.");
  }
  get progress(): Progress {
    throw new Error("Method not implemented.");
  }
}
