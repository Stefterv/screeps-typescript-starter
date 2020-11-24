export abstract class Task {
  abstract candidates(creeps: Array<Creep>): Array<Creep>;
  get name() {
    return this.constructor.name;
  }
  abstract execute(creep: Creep): boolean;
  abstract prepare(room: Room): void;

  // per creep when to revisit the task
  // per creep does it need to move somewhere?
}
