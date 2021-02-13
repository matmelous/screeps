import { creepsAmount } from "configurations";
import { randomName, workerLevels } from "../../helpers";

const  roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};




export const  getBuilder = () =>{
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    return(builders);
}

export const  getNumberOfBuilders = () =>{
    return(getBuilder().length);
}

export const  createBuilder = (spawn,level)=>{
    const levels = workerLevels;

    Memory.creepsCount.workers.count++;
    Memory.creepsCount.workers.builders.count++;

    const numberOfHarvesters = Memory.creepsCount.workers.builders.count;
    var newName = 'builder-' + numberOfHarvesters;
    console.log('Spawning new builder: ' + newName);
    spawn.spawnCreep(levels[level], newName,
        { memory: { role: 'builder', category: 'worker', level: level}});
}

export const  watchBuilders = (spawn,level)=>{

    if(spawn.spawning==null){
        if(getNumberOfBuilders()<3){

            if(spawn.store.getUsedCapacity(RESOURCE_ENERGY)>250){
                createBuilder(spawn,level)
            }
        }
    }
}


const setBuildersLimit = (newLimit) => {
    Memory.creepsCount.workers.builders.limit = newLimit;
}

const calculateBuildersLimit = () => {
    const limit = Math.floor(Memory.creepsCount.workers.limit * creepsAmount.builders);
    return limit < 1 ? 0 : limit;
}

const updateBuildersLimit = () => {
    setBuildersLimit(calculateBuildersLimit());
}

const maintainBuilders = (spawn) => {
    const numberOfBuilders = Memory.creepsCount.workers.count;
    const limitOfBuilders = Memory.creepsCount.workers.limit;
    if (numberOfBuilders < limitOfBuilders) {
        createBuilder(spawn, 0);
    }
}
export const manageBuilders = (spawn) => {
    updateBuildersLimit();
    maintainBuilders(spawn);
}


export default roleBuilder;
