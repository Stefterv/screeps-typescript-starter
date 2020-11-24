export const HARVESTER = "h1";

export function Harvest() {
  Memory.harvesters = Memory.harvesters || 2;

  let harvesters = Object.values(Game.creeps).filter(creep => creep.memory.role == HARVESTER);

  if (harvesters.length < Memory.harvesters) {
    for (let spawnName in Game.spawns) {
      Spawn(Game.spawns[spawnName]);
    }
  }
  for (let creep of harvesters) {
    let harvester = new Harvester(creep);
    harvester.harvestEnergy();
  }
}

export function Spawn(spawn: StructureSpawn) {
  if (spawn.store.energy < 300) return;
  let newName = "Harvester" + Game.time;
  console.log("Spawning new harvester: " + newName);
  spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: HARVESTER } });
}

export class Harvester extends Creep {
  constructor(creep: Creep) {
    super(creep.id);
    Object.assign(this, creep);
  }
  harvestEnergy() {
    if (this.store.getFreeCapacity() > 0) {
      this.captureEnergy();
    } else {
      this.depositEnergy();
    }
  }
  captureEnergy() {
    let sources = this.room.find(FIND_SOURCES);
    if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      this.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }
  depositEnergy() {
    var targets = this.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    });
    if (targets.length > 0) {
      if (this.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  }
}
