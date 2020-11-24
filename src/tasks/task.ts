export abstract class Task {
  abstract candidates(creeps: Array<Creep>): Array<Creep>;
  get name() {
    return this.constructor.name;
  }
  abstract execute(creep: Creep): boolean;
  abstract prepare(room: Room): void;
}
