const CHARGERS = 2;

import { Task } from "../../classes/task";

export default class DepositSpawn extends Task {
  readonly range = 1;
  static generate(room: Room): Array<Task> {
    let tasks = new Array<Task>();
    let spawns = room.find(FIND_MY_SPAWNS);

    for (let spawn of spawns) {
      for (let instance of [...Array(CHARGERS).keys()].map((i) => i + 1)) {
        let task = new DepositSpawn(spawn);
        task.instance = instance;
        tasks.push(task);
      }
    }

    return tasks;
  }
  get spawn() {
    return (this.target as unknown) as StructureSpawn;
  }
  candidates(creeps: Creep[]): Creep[] {
    return creeps.filter((creep) => creep.store.getFreeCapacity() == 0);
  }
  finished(creep: Creep): boolean {
    let spawn = this.spawn;
    if (creep.store.energy == 0) return true;
    return spawn.store.getFreeCapacity() == 0;
  }
  action(creep: Creep): void {
    creep.transfer(this.spawn, RESOURCE_ENERGY);
  }
}
