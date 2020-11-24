import { Task } from "./task";

export class SpawnWorkers extends Task {
  candidates(creeps: Creep[]): Creep[] {
    return [];
  }
  execute(creep: Creep): boolean {
    return true;
  }
  prepare(room: Room): void {
    let creeps = Object.values(Game.creeps);

    // look at the closest source for each spawn and spawn as many creeps as they can support + 2
    if (creeps.length > room.find(FIND_SOURCES).length * 4) return;

    for (let spawnName in Game.spawns) {
      let spawn = Game.spawns[spawnName];
      // if (spawn.isActive()) continue;
      if (spawn.store.energy < 200) continue;

      let newName = "Worker" + Game.time;
      console.log("Spawning new worker: " + newName);
      spawn.spawnCreep([WORK, CARRY, MOVE], newName);
      return;
    }
  }
}
