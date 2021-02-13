
import { manageWorkers } from 'modules/workers/management';
import {clearMemory} from '../helpers/';

const setCreepsLimit = (newLimit) => {
    Memory.creepsCount.limit = newLimit;
}

const getEnergyAmount=(spawn)=>{
    return spawn.store.getUsedCapacity(RESOURCE_ENERGY);
}

const calculateCreepsLimit = (spawn) => {
    const spawnCost = 200;
    const energyAvailable = getEnergyAmount(spawn);
    const availableSpawn=energyAvailable/spawnCost;
    let limit = Math.floor(availableSpawn * 0.5);
    return limit < 10 ? 10 : limit;
}

const updateCreeps = (spawn) => {
    setCreepsLimit(calculateCreepsLimit(spawn));
}

const manageCreeps = (spawn) => {
    updateCreeps(spawn);
    manageWorkers(spawn);

}

const roleSpawner = {
    run: function(){
        clearMemory();


        for(var spawnName in Game.spawns){
            const spawn=Game.spawns[spawnName];
            manageCreeps(spawn);

        }
    }
}

export default roleSpawner;
