// Tasks have a priority and an amount of requested creeps
// Tasks also have a list of targets, the closest creep will change tasks
export abstract class Task {
  abstract get targets(): RoomPosition[];

  abstract get workers(): number;
  abstract get priority(): Array<number>;

  abstract get progress(): Progress;
}

interface Progress {
  finishedIn: number;
}
