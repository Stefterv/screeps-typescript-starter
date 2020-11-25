// generate how many which attributes we need
// also look at how many attributes are realistic based on storage, max storage and current gathering capacity
import { Plan, Requirements } from "../../classes/plan";

export class SpawnWorkers extends Plan {
  get requirements(): Requirements {
    return {};
  }
  run(room: Room): void {
    let worker = [WORK, CARRY, MOVE];
    for (
      let energy = 200;
      energy < room.energyCapacityAvailable - 50;
      energy += 100
    ) {
      worker.push(worker[worker.length - 3]);
    }
    worker.sort();
    let creeps = room.find(FIND_CREEPS);

    // look at the closest source for each spawn and spawn as many creeps as they can support + 2
    if (creeps.length > room.find(FIND_SOURCES).length * 4) return;

    for (let spawnName in Game.spawns) {
      let spawn = Game.spawns[spawnName];
      if (spawn.room.energyAvailable < 50 + 50 * worker.length) continue;

      let newName = "Worker" + Game.time;
      console.log("Spawning new worker: " + newName);
      spawn.spawnCreep(worker, newName);
      return;
    }
  }
}
