import { Task } from "./task";

export class HarvestEnergy extends Task {
  prepare() {}
  candidates(candidates: Array<Creep>) {
    return candidates.filter(creep => creep.store.getFreeCapacity() > 0);
  }

  execute(creep: Creep) {
    if (!creep.store.getFreeCapacity()) return true;

    let sources = creep.room.find(FIND_SOURCES);
    let harvesting = false;
    for (let source of sources) {
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) continue;
      harvesting = true;
    }
    if (!harvesting) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }

    return false;
  }
}
