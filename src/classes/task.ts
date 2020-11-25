// Tasks have a priority and an amount of requested creeps
// Tasks also have a list of targets, the closest creep will change tasks
export abstract class Task {
  get name() {
    return this.constructor.name;
  }
  abstract get targets(): RoomPosition[];

  abstract get workers(): number;
  abstract get priority(): Array<number>;

  abstract get progress(): Progress;

  abstract action(creep: Creep): void;

  abstract finished(creep: Creep): boolean;
}

interface Progress {
  finishedIn: number;
}
