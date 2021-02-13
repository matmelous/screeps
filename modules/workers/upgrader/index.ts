import { creepsAmount } from "configurations";
import { randomName, workerLevels } from "modules/helpers";

const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
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

export const getUpgrader = () => {
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    return (upgraders);
}

export const getNumberOfUpgraders = () => {
    return (getUpgrader().length);
}

export const createUpgrader = (spawn, level) => {
    const levels = workerLevels;

    Memory.creepsCount.workers.count++;
    Memory.creepsCount.workers.upgraders.count++;

    const numberOfHarvesters = Memory.creepsCount.workers.upgraders.count;
    var newName = 'upgrader-' + numberOfHarvesters;
    console.log('Spawning new upgrader: ' + newName);
    spawn.spawnCreep(levels[level], newName,
        { memory: { role: 'upgrader', category: 'worker', level: level } });
}



const setUpgradersLimit = (newLimit) => {
    Memory.creepsCount.workers.upgraders.limit = newLimit;
}

const calculateUpgradersLimit = () => {
    const limit = Math.floor(Memory.creepsCount.workers.limit * creepsAmount.upgraders);
    return limit < 1 ? 0 : limit;
}

const updateUpgradersLimit = () => {
    setUpgradersLimit(calculateUpgradersLimit());
}

const maintainUpgraders = (spawn) => {
    const numberOfUpgraders = Memory.creepsCount.workers.count;
    const limitOfUpgraders = Memory.creepsCount.workers.limit;
    if (numberOfUpgraders < limitOfUpgraders) {
        createUpgrader(spawn, 0);
    }
}
export const manageUpgraders = (spawn) => {
    updateUpgradersLimit();
    maintainUpgraders(spawn);
}

export default roleUpgrader;
