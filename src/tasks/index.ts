// tasks are prioritized by creep based on distance, priority, how many workers it needs
// once a task is started, it is not altered until it is finished

export class TaskManager {
  Assign() {
    // reassign active workers to their tasks

    let workers = 8; //creeps that are right now not actively working on a task

    // sort tasks by priority

    // per task
    // per target
    // find the closest worker and assign them

    // fill the tasks and then if there is a overload, then assign tasks based on distance and priority

    // assign creeps to highest priority/closest task that they allow for

    // save the requested amount of workers to memory so the spawner can spawn more if necessary
  }

  MoveTo() {}

  Execute() {}
}
