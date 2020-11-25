import { Plan } from "classes/plan";
import { planList } from "./all";

export class PlanManager {
  Execute() {
    let plans = planList.flatMap((plan) => {
      return new plan();
    });
    for (let room of Object.values(Game.rooms)) {
      plans.map((plan) => plan.run(room));
    }
  }
}
