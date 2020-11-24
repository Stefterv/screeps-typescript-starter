import { Task } from "./task";

export class DepositEnergy extends Task {
  targets: AnyStructure[] = [];
  prepare(room: Room) {
    this.targets = room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    });
  }
  execute(creep: Creep): boolean {
    if (!creep.store[RESOURCE_ENERGY]) return true;
    if (this.targets.length == 0) return true;
    let harvesting = false;
    for (let source of this.targets) {
      if (creep.transfer(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) continue;
      harvesting = true;
    }
    if (!harvesting) {
      creep.moveTo(this.targets[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
    return false;
  }
  candidates(creeps: Array<Creep>) {
    if (!this.targets) return [];
    return creeps.filter(creep => creep.store[RESOURCE_ENERGY]);
  }
}
