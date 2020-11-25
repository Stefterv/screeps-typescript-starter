// find an unused energy source, one that has not been covered or reserved by any other creeps
// priority low
// requested workers 2 / based on the energy needs
const CHARGERS = 2;

import { Task } from "../../classes/task";
export default class HarvestEnergy extends Task {
  readonly range = 1;
  get source() {
    return (this.target as unknown) as Source;
  }
  static generate(room: Room): Task[] {
    let tasks = new Array<Task>();
    let sources = room.find(FIND_SOURCES);
    function distToClosestSpawn(source: Source): number {
      let spawn = source.pos.findClosestByPath(FIND_MY_SPAWNS);
      if (!spawn) return Number.MAX_VALUE;
      return source.pos.getRangeTo(spawn.pos);
    }
    let distances = sources.map(distToClosestSpawn);
    sources.sort((a, b) => {
      return distToClosestSpawn(b) - distToClosestSpawn(a);
    });
    let distances2 = sources.map(distToClosestSpawn);

    for (let source of sources) {
      if (source.energy == 0) continue;

      let spaces = source.room
        .lookAtArea(
          source.pos.y - 1,
          source.pos.x - 1,
          source.pos.y + 1,
          source.pos.x + 1,
          true
        )
        .filter((result) => {
          return (
            (result.type == LOOK_TERRAIN && result.terrain == "plain") ||
            result.type == LOOK_CREEPS
          );
        }).length;

      for (let instance of [...Array(spaces).keys()].map((i) => i + 1)) {
        let task = new HarvestEnergy(source);
        task.instance = tasks.length;
        tasks.push(task);
      }
    }
    return tasks;
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
