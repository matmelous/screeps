
import { creepsAmount } from 'configurations';
import {randomName, workerLevels}  from '../../helpers/';

const roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};




export const  getHarvesters = () =>{
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    return(harvesters);
}

export const  getNumberOfHarvesters = () =>{
    return(getHarvesters().length);
}

export const  createHarvester = (spawn,level)=>{
    const levels = workerLevels;
    const numberOfHarvesters=Memory.creepsCount.workers.harvesters.count;
    var newName = 'harvester-' + numberOfHarvesters;
    console.log('Spawning new harvester: ' + newName);
    Memory.creepsCount.workers.count++;
    Memory.creepsCount.workers.harvesters.count++;
    spawn.spawnCreep(levels[level], newName,
        { memory: { role: 'harvester', category: 'worker', level: level}});
}

const setHarverstersLimit = (newLimit) => {
    Memory.creepsCount.workers.harvesters.limit = newLimit;
}

const calculateHarvestersLimit = () => {
    const limit = Math.floor(Memory.creepsCount.workers.limit * creepsAmount.harvesters);
    return limit < 1 ? 1 : limit;
}

const updateHarvestersLimit = () => {
    setHarverstersLimit(calculateHarvestersLimit());
}

const maintainHarvesters = (spawn) => {
    const numberOfHarvesters = Memory.creepsCount.workers.count;
    const limitOfHarvesters = Memory.creepsCount.workers.limit;
    if (numberOfHarvesters < limitOfHarvesters) {
        createHarvester(spawn, 0);
    }
}

export const manageHarvesters = (spawn) => {
    updateHarvestersLimit();
    maintainHarvesters(spawn);
}


export default roleHarvester;
