// Tasks have a priority and an amount of requested creeps
// Tasks also have a list of targets, the closest creep will change tasks
export abstract class Task {
  get name() {
    return this.constructor.name;
  }
  target: RoomPosition;
  workers: number = 0;
  priority: Array<Number> = [1];
  constructor(target: RoomPosition) {
    this.target = target;
  }
  static generate(): Array<Task> {
    return [];
  }
  abstract candidates(creeps: Array<Creep>): Array<Creep>;

  abstract finished(creep: Creep): boolean;
  abstract action(creep: Creep): void;

  abstract get progress(): Progress;
}

export interface Progress {
  finishedIn: number;
}
