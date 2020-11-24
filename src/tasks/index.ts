import { Task } from "./task";

import { HarvestEnergy } from "./HarvestEnergy";
import { DepositEnergy } from "./DepositEnergy";
import { UpgradeController } from "./UpgradeController";
import { Construction } from "./Construction";
import { SpawnWorkers } from "./SpawnWorkers";
const tasks: Array<Task> = [
  new HarvestEnergy(),
  new DepositEnergy(),
  new Construction(),
  new UpgradeController(),
  new SpawnWorkers()
];

export function RunTasks() {
  // order tasks by importance
  for (let room of Object.values(Game.rooms)) {
    for (let task of tasks) {
      task.prepare(room);
    }
  }

  AssignTasks();
  ExecuteTasks();
}
function AssignTasks() {
  let creeps = Object.values(Game.creeps).filter(creep => !creep.memory.task);

  for (let task of tasks) {
    let candidates = task.candidates(creeps);
    creeps = creeps.filter(creep => !candidates.includes(creep));

    for (let creep of candidates) {
      creep.memory.task = task.name;
      creep.say(task.name);
    }
  }
}
function ExecuteTasks() {
  let creeps = Object.values(Game.creeps).filter(creep => creep.memory.task);
  for (let creep of creeps) {
    let task = tasks.filter(task => task.name == creep.memory.task)[0];
    let result = task.execute(creep);
    if (result) {
      delete creep.memory.task;
    }
  }
}
