import { Task } from "./task";

export class Construction extends Task {
  targets: ConstructionSite[] = [];
  prepare(room: Room) {
    this.targets = room.find(FIND_CONSTRUCTION_SITES);
  }
  execute(creep: Creep): boolean {
    if (!creep.store[RESOURCE_ENERGY]) return true;
    if (this.targets.length == 0) return true;
    let harvesting = false;
    for (let source of this.targets) {
      if (creep.build(source) == ERR_NOT_IN_RANGE) continue;
      harvesting = true;
    }
    if (!harvesting) {
      creep.moveTo(this.targets[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
    return false;
  }
  candidates(creeps: Array<Creep>) {
    if (!this.targets.length) return [];
    return creeps.filter(creep => creep.store[RESOURCE_ENERGY]);
  }
}
