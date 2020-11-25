// tasks are prioritized by creep based on distance, priority, how many workers it needs
// once a task is started, it is not altered until it is finished

import { Task } from "classes/task";
import { HarvestEnergy } from "./harvest/energy";

const taskTypes = [HarvestEnergy];

export class TaskManager {
  Assign() {
    let unassignedTasks = this.Generate();
    let assignedTasks = new Array<Task>();
    let lazyCreeps = Object.values(Game.creeps);
    let busyCreeps = new Array<Creep>();

    for (let creep of lazyCreeps) {
      let taskId = creep.memory.task;
      if (!taskId) continue;
      let task = unassignedTasks.find((task) => task.id == taskId);
      if (!task) continue;
      task.creep = creep;
      assignedTasks.push(task);
      busyCreeps.push(creep);
    }

    function updateLists() {
      unassignedTasks = unassignedTasks.filter(
        (item) => !assignedTasks.includes(item)
      );
      lazyCreeps = lazyCreeps.filter((item) => !busyCreeps.includes(item));
    }

    // per task
    //    find the closest worker and assign them
    for (let task of unassignedTasks) {
      let candidates = task.candidates(lazyCreeps);
      candidates.sort((a, b) => {
        //TODO compare their capabilities
        //TODO compare their time to get there instead of the distance
        return a.pos.getRangeTo(task.target) - b.pos.getRangeTo(task.target);
      });
      if (!candidates.length) continue;

      let creep = candidates[0];
      task.creep = creep;
      busyCreeps.push(creep);
      assignedTasks.push(task);

      updateLists();
    }

    for (let creep of lazyCreeps) {
      // repeat the most important tasks for any creeps that are left over
    }

    for (let task of assignedTasks) {
      // check if the creep is already engaged in the task by checking the memory
      // if not, move to the target and check if next tick it will have arrived
      // else
      // execute task
    }

    // save the requested amount of workers to memory so the spawner can spawn more if necessary
  }

  Generate(): Task[] {
    let tasks = taskTypes.flatMap((taskType) => {
      return Object.values(Game.rooms).flatMap((room) =>
        taskType.generate(room)
      );
    });
    tasks.sort((a, b) => {
      if (a.priority.length == a.priority.length) {
        if (a.priority[0] == b.priority[0]) {
          return b.instance - a.instance;
        }
        return a.priority[0] - b.priority[0];
      }
      return a.priority.length - b.priority.length;
    });
    return tasks;
  }
}
