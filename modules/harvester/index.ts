
import {randomName, workerLevels}  from '../helpers/';

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

    var newName = randomName('harvester-');
    console.log('Spawning new harvester: ' + newName);
    spawn.spawnCreep(levels[level], newName,
                {memory: {role: 'harvester', level: level}});
}

export const  watchHarvesters = (spawn,level)=>{

    if(spawn.spawning==null){
        if(getNumberOfHarvesters()<3){

            if(spawn.store.getUsedCapacity(RESOURCE_ENERGY)>200){
                createHarvester(spawn,level)
            }
        }
    }
}

export default roleHarvester;
