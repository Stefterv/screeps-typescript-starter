import { Task } from "../../classes/task";

export class Construction extends Task {
  static generate(): Task[] {
    // generate tasks for
    // - roads, storage, towers, rampart

    // storage should only be build have the roads have been constructed
    // radial roads should only be build after defences have been put up
    return [];
  }

  candidates(creeps: Creep[]): Creep[] {
    throw new Error("Method not implemented.");
  }
  finished(creep: Creep): boolean {
    throw new Error("Method not implemented.");
  }
  action(creep: Creep): void {
    throw new Error("Method not implemented.");
  }
}
