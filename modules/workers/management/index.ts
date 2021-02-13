import { manageBuilders } from "modules/workers/builder"
import { manageHarvesters } from "modules/workers/harvester"
import { manageUpgraders } from "../upgrader"

const setWorkersLimit = (newLimit) => {
  Memory.creepsCount.workers.limit = newLimit;
}

const calculateWorkersLimit = () =>{
  const limitOfCreeps = Memory.creepsCount.limit;
  let limit = Math.floor(limitOfCreeps * 0.3);
  return limit < 1 ? 1 : limit;
}

const updateWorkers =()=>{
  setWorkersLimit(calculateWorkersLimit());
}

export const manageWorkers = (spawn) => {
  updateWorkers();
  manageHarvesters(spawn);
  manageBuilders(spawn);
  manageUpgraders(spawn);
}

export const init = ()=>{
  if (Memory.creepsCount===undefined || Memory.refresh===true){
    Memory.refresh=false;
    Memory.creepsCount = {
      limit:1,
      workers: {
        count: 0,
        limit: 0,
        harvesters: {
          count: 0,
          limit: 0
        },
        builders: {
          count: 0,
          limit: 0
        },
        upgraders: {
          count: 0,
          limit: 0
        }
      }
    }
  }
}
