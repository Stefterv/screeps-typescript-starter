import { ErrorMapper } from "utils/ErrorMapper";
import { TaskManager } from "./tasks/";
import { PlanManager } from "./planning/";

let taskManager = new TaskManager();
let planManager = new PlanManager();
let testConsistency = 0;

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(
    `Current game tick is ${Game.time}, used CPU: ${Game.cpu
      .getUsed()
      .toFixed(2)}/${Game.cpu.tickLimit}, Consistency:${testConsistency}`
  );
  testConsistency++;
  planManager.Execute();
  taskManager.Assign();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
