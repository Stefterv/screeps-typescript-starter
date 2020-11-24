// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  task?: string;
  upgrading?: boolean;
}

interface Memory {
  harvesters: any;
  upgraders: any;
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
