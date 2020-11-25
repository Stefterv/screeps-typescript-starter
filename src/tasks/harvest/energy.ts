// find an unused energy source, one that has not been covered or reserved by any other creeps
// priority low
// requested workers 2 / based on the energy needs

import { Task, Progress } from "../../classes/task";
export class HarvestEnergy extends Task {
  static generate(room: Room): Task[] {
    // generate a bunch of priority [1] tasks and then a bunch of priority [0] for backup
    return [];
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
