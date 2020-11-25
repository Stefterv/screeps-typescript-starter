// Tasks have a priority and an amount of requested creeps
// Tasks also have a list of targets, the closest creep will change tasks
export abstract class Task {
  get id() {
    return this.constructor.name;
  }
  target: RoomPosition;
  instance: number = 0;
  priority: Array<number> = [1];
  creep?: Creep;
  constructor(target: RoomPosition) {
    this.target = target;
  }
  static generate(room: Room): Array<Task> {
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
