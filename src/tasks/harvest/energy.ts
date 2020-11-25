// find an unused energy source, one that has not been covered or reserved by any other creeps
// priority low
// requested workers 2 / based on the energy needs

import { Task } from "../../classes/task";
export class HarvestEnergy extends Task {
  source: Source;
  constructor(target: RoomPosition, source: Source) {
    super(target);
    this.source = source;
  }
  static generate(room: Room): Task[] {
    let sources = room.find(FIND_SOURCES);
    return [];
  }
  action(creep: Creep): void {
    creep.harvest(this.source);
  }
  finished(creep: Creep): boolean {
    if (creep.store.getFreeCapacity() == 0) return true;
    if (this.source.energy == 0) return true;
    return false;
  }
  candidates(creeps: Creep[]): Creep[] {
    return creeps.filter((creep) => creep.store.getFreeCapacity());
  }
}
