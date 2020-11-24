import { Task } from "./task";

export class HarvestEnergy extends Task {
  prepare(room: Room) {}
  candidates(candidates: Array<Creep>) {
    return candidates.filter(creep => creep.store.getFreeCapacity() > 0);
  }

  execute(creep: Creep) {
    if (!creep.store.getFreeCapacity()) return true;

    let unsorted = creep.room
      .find(FIND_SOURCES)
      .filter(source => {
        let spots = source.pos.look();
        return spots.length < 9;
      })
      .map(source => ({ source, distance: creep.pos.getRangeTo(source) }));
    unsorted.sort((a, b) => a.distance - b.distance);
    let sources = unsorted.map(sorted => sorted.source).filter(source => source.energy);

    // look at which creeps are intending/using to go to this source already
    // only move to another source if it will be faster than the others finish

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
