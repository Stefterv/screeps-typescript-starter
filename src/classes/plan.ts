// plans are based on prerequisites
export abstract class Plan {
  abstract get requirements(): Requirements;
}
interface Requirements {
  controller?: number;
  creep?: {
    size?: number;
  };
}
export type { Requirements };
