export const ROLE = "u1";

export function Upgrade() {
  Memory.upgraders = Memory.upgraders || 1;

  let upgraders = Object.values(Game.creeps).filter(creep => creep.memory.role == ROLE);

  if (upgraders.length < Memory.upgraders) {
    for (let spawnName in Game.spawns) {
      Spawn(Game.spawns[spawnName]);
    }
  }

  for (let creep of upgraders) {
    let upgrader = new Upgrader(creep);
    upgrader.upgrading();
  }
}

export class Upgrader extends Creep {
  constructor(creep: Creep) {
    super(creep.id);
    Object.assign(this, creep);
    creep.memory.role = ROLE;
  }
  upgrading() {
    if (this.memory.upgrading && this.store[RESOURCE_ENERGY] == 0) {
      this.memory.upgrading = false;
      this.say("🔄 harvest");
    }
    if (!this.memory.upgrading && this.store.getFreeCapacity() == 0) {
      this.memory.upgrading = true;
      this.say("⚡ upgrade");
    }

    if (this.memory.upgrading) {
      if (this.upgradeController(this.room.controller!) == ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.controller!, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    } else {
      var sources = this.room.find(FIND_SOURCES);
      if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        this.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
}
export function Spawn(spawn: StructureSpawn) {
  if (spawn.store.energy < 300) return;
  let newName = "Upgrader" + Game.time;
  console.log("Spawning new Upgrader: " + newName);
  spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: ROLE } });
}
