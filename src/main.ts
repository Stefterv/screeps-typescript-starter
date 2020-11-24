import { ErrorMapper } from "utils/ErrorMapper";

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}, used CPU: ${Game.cpu.getUsed().toFixed(2)}/${Game.cpu.tickLimit}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
